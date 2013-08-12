<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="document_head">
		<xsl:comment><![CDATA[[if lt IE 7]><html lang="en" class="no-js ie6"><![endif]]]></xsl:comment>
		<xsl:comment><![CDATA[[if IE 7]><html lang="en" class="no-js ie7"><![endif]]]></xsl:comment>
		<xsl:comment><![CDATA[[if IE 8]><html lang="en" class="no-js ie8"><![endif]]]></xsl:comment>
		<xsl:comment><![CDATA[[if IE 9]><html lang="en" class="no-js ie9"><![endif]]]></xsl:comment>
		<xsl:comment><![CDATA[[if IE]><![if (gt IE 9)|!(IE)]><![endif]]]></xsl:comment><html lang="en" class="no-js">
		<xsl:comment><![CDATA[[if IE]><![endif]><![endif]]]></xsl:comment>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			<meta charset="utf-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
			<meta name="title" content="{$page-title}" />
			<meta name="description" content="" />
			<meta name="tags" content="" />
			
			<title><xsl:call-template name="page-title"/></title>

			<link rel="shortcut icon" href="/favicon.ico" />
			<link rel="icon" type="images/png" href="{$workspace}/assets/images/favicon.png" />
			<link rel="stylesheet" media="screen" href="{$workspace}/css/main.css" />
			
			<xsl:comment>[if !(IE)]<![CDATA[><!]]></xsl:comment>
				<!-- link to any non-IE stylesheets/JS -->
			<xsl:comment><![CDATA[<!]]>[endif]</xsl:comment>	
			
			<script src="{$workspace}/components/modernizr/modernizr.js"></script>
			
			<xsl:comment><![CDATA[[if (gte IE 6)&(lte IE 8)]><script type="text/javascript" src="]]><xsl:value-of select="$root"/><![CDATA[/workspace/components/selectivizr/selectivizr.js"></script><![endif]]]></xsl:comment>
		</head>
	</xsl:template>

</xsl:stylesheet>
