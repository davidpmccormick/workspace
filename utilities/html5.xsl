<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:import href="../utilities/page-title.xsl" />
<xsl:import href="../utilities/navigation.xsl" />
<xsl:import href="../utilities/date-time.xsl" />
<xsl:import href="../includes/document_head.xsl" />
<xsl:import href="../includes/header.xsl" />
<xsl:import href="../includes/footer.xsl" />
<xsl:import href="../includes/scripts.xsl" />

<xsl:output method="html" omit-xml-declaration="yes" indent="no" />

<xsl:variable name="is-logged-in" select="/data/events/login-info/@logged-in" />

<xsl:template match="/">
	<xsl:text disable-output-escaping="yes">&lt;</xsl:text>!DOCTYPE html<xsl:text disable-output-escaping="yes">&gt;</xsl:text>
	<html lang="en">
	
		<xsl:call-template name="document_head" />
				
		<body id="{$current-page}-page">
		
			<xsl:call-template name="header" />
			
			<section id="maincontent" class="section">
				<xsl:apply-templates />
			</section>
			
			<xsl:call-template name="footer" />

			<xsl:call-template name="scripts" />
		</body>
	</html>
</xsl:template>

<xsl:strip-space elements="*" />

</xsl:stylesheet>