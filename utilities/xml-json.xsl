<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
    xmlns:attr="attributes"
    xmlns:wc="arrayish"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:exsl="http://exslt.org/common"
    exclude-result-prefixes="wc attr"
    extension-element-prefixes="exsl">
    
	<!--
		Example call:

		<xsl:call-template name="xml-to-json">
			<xsl:with-param name="xml">
				[Any XML or XSLT transformation]
			</xsl:with-param>
		</xsl:call-template>
	-->

  <wc:array>
    <attr>it</attr>
    <attr>lit</attr>
    <attr>item</attr>
  </wc:array>

  <xsl:strip-space elements="*"/>


  <xsl:template name="xml-to-json">
    <xsl:param name="xml"/>
    <xsl:variable name="parsed">
      <xsl:apply-templates select="exsl:node-set($xml)" mode="transform"/>
    </xsl:variable>
    <xsl:apply-templates select="exsl:node-set($parsed)" mode="xml-to-json"/>
  </xsl:template>

  <xsl:template match="*" mode="transform">
    <xsl:element name="{name(.)}">
      <xsl:if test="./@*">
        <attr:attributes>
          <xsl:apply-templates select="@*" mode="transform"/>
        </attr:attributes>
      </xsl:if>
      <xsl:apply-templates select="*" mode="transform"/>
      <xsl:apply-templates select="text()" mode="transform"/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="@*" mode="transform">
    <xsl:element name="{name()}">
      <xsl:value-of select="."/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="text()" mode="transform">
    <xsl:choose>
      <xsl:when test="../@*">
        <value>
          <xsl:value-of select="."/>
        </value>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="."/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="*[count(../*[name(../*)=name(.)])=count(../*) and (count(../*)&gt;1 or (count(../*)&gt;0 and  document('')/*/wc:array/attr = name(.) ))]" mode="transform">
    <xsl:choose>
      <xsl:when test="../@*">
        <xsl:if test="not(preceding-sibling::*)">
          <values>
            <xsl:apply-templates select=". | following-sibling::*" mode="array-transform"/>
          </values>
        </xsl:if>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="." mode="array-transform"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="*" mode="array-transform">
    <item name="{name()}">
      <xsl:choose>
        <xsl:when test="@* and count(child::node())&gt;0">
          <attr:attributes>
            <xsl:apply-templates select="@*" mode="transform"/>
          </attr:attributes>
          <xsl:choose>
            <xsl:when test="not(text())">
              <value>
                <xsl:apply-templates select="child::node()" mode="transform"/>
              </value>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates select="child::node()" mode="transform"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:otherwise>
          <xsl:apply-templates select="child::node()" mode="transform"/>
        </xsl:otherwise>
      </xsl:choose>
    </item>
  </xsl:template>

  <!-- string -->
  <xsl:template match="text()" mode="xml-to-json" >
    <xsl:choose>
      <xsl:when test=". = 'null'">null</xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="escape-string">
          <xsl:with-param name="s" select="."/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Main template for escaping strings; used by above template and for object-properties
    Responsibilities: placed quotes around string, and chain up to next filter, escape-bs-string -->
  <xsl:template name="escape-string">
    <xsl:param name="s"/>
    <xsl:text>"</xsl:text>
    <xsl:call-template name="escape-bs-string">
      <xsl:with-param name="s" select="$s"/>
    </xsl:call-template>
    <xsl:text>"</xsl:text>
  </xsl:template>

	<!-- transform attr namspace ot @attribute-->
  <xsl:template name="escape-attributes">
    <xsl:text>@attributes</xsl:text>
  </xsl:template>

  <!-- Escape the backslash (\) before everything else. -->
  <xsl:template name="escape-bs-string">
    <xsl:param name="s"/>
    <xsl:choose>
      <xsl:when test="contains($s,'attr:attributes')">
        <xsl:call-template name="escape-attributes"/>
      </xsl:when>
      <xsl:when test="contains($s,'\')">
        <xsl:call-template name="escape-quot-string">
          <xsl:with-param name="s" select="concat(substring-before($s,'\'),'\\')"/>
        </xsl:call-template>
        <xsl:call-template name="escape-bs-string">
          <xsl:with-param name="s" select="substring-after($s,'\')"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="escape-quot-string">
          <xsl:with-param name="s" select="$s"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Escape the double quote ("). -->
  <xsl:template name="escape-quot-string">
    <xsl:param name="s"/>
    <xsl:choose>
      <xsl:when test="contains($s,'&quot;')">
        <xsl:call-template name="encode-string">
          <xsl:with-param name="s" select="concat(substring-before($s,'&quot;'),'\&quot;')"/>
        </xsl:call-template>
        <xsl:call-template name="escape-quot-string">
          <xsl:with-param name="s" select="substring-after($s,'&quot;')"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="encode-string">
          <xsl:with-param name="s" select="$s"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- Replace tab, line feed and/or carriage return by its matching escape code. Can't escape backslash
    or double quote here, because they don't replace characters (&#x0; becomes \t), but they prefix
    characters (\ becomes \\). Besides, backslash should be seperate anyway, because it should be
    processed first. This function can't do that. -->
  <xsl:template name="encode-string">
    <xsl:param name="s"/>
    <xsl:choose>
      <!-- tab -->
      <xsl:when test="contains($s,'&#x9;')">
        <xsl:call-template name="encode-string">
          <xsl:with-param name="s" select="concat(substring-before($s,'&#x9;'),'\t',substring-after($s,'&#x9;'))"/>
        </xsl:call-template>
      </xsl:when>
      <!-- line feed -->
      <xsl:when test="contains($s,'&#xA;')">
        <xsl:call-template name="encode-string">
          <xsl:with-param name="s" select="concat(substring-before($s,'&#xA;'),'\n',substring-after($s,'&#xA;'))"/>
        </xsl:call-template>
      </xsl:when>
      <!-- carriage return -->
      <xsl:when test="contains($s,'&#xD;')">
        <xsl:call-template name="encode-string">
          <xsl:with-param name="s" select="concat(substring-before($s,'&#xD;'),'\r',substring-after($s,'&#xD;'))"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise><xsl:value-of select="$s"/></xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- number (no support for javascript mantise) -->
  <xsl:template match="text()[not(string(number())='NaN')]" mode="xml-to-json" >
    <xsl:value-of select="."/>
  </xsl:template>

  <!-- boolean, case-insensitive -->
  <xsl:template match="text()[translate(.,'TRUE','true')='true']" mode="xml-to-json" >true</xsl:template>
  <xsl:template match="text()[translate(.,'FALSE','false')='false']" mode="xml-to-json" >false</xsl:template>

  <!-- object -->
  <xsl:template match="*" mode="xml-to-json" >
    <xsl:if test="not(preceding-sibling::*)">{</xsl:if>
    <xsl:call-template name="escape-string">
      <xsl:with-param name="s" select="name()"/>
    </xsl:call-template>
    <xsl:text>:</xsl:text>
    <xsl:if test="count(child::node())=0">""</xsl:if>
    <xsl:apply-templates select="child::node()" mode="xml-to-json"/>
    <xsl:if test="following-sibling::*">,</xsl:if>
    <xsl:if test="not(following-sibling::*)">}</xsl:if>
  </xsl:template>

  <!-- array -->
  <xsl:template match="*[count(../*[name(../*)=name(.)])=count(../*) and count(../*)&gt;1 or (count(../*)&gt;0 and name() = 'item')]" mode="xml-to-json" >
    <xsl:if test="not(preceding-sibling::*)">[</xsl:if>
    <xsl:choose>
      <xsl:when test="not(child::node())">
        <xsl:text>null</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="child::node()" mode="xml-to-json"/>
      </xsl:otherwise>
    </xsl:choose>
    <xsl:if test="following-sibling::*">,</xsl:if>
    <xsl:if test="not(following-sibling::*)">]</xsl:if>
  </xsl:template>
</xsl:stylesheet>