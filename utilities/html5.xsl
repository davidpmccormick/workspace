<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:import href="../utilities/page-title.xsl"/>
<xsl:import href="../utilities/navigation.xsl"/>
<xsl:import href="../utilities/date-time.xsl"/>

<xsl:output method="html" omit-xml-declaration="yes" indent="no" />

<xsl:variable name="is-logged-in" select="/data/events/login-info/@logged-in"/>

<xsl:template match="/">
	<xsl:text disable-output-escaping="yes">&lt;</xsl:text>!DOCTYPE html<xsl:text disable-output-escaping="yes">&gt;</xsl:text>
	<html lang="en">
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			<meta charset="utf-8" />
			<meta name="title" content="{$page-title}" />
			<meta name="description" content="" />
			<meta name="tags" content="" />
			<title><xsl:call-template name="page-title"/></title>

			<link rel="shortcut icon" href="/favicon.ico" />
			<link rel="icon" type="images/png" href="{$workspace}/assets/images/favicon.png" />
			<link rel="stylesheet" media="screen" href="{$workspace}/css/bootstrap.min.css" />
			<link rel="stylesheet" media="screen" href="{$workspace}/css/bootstrap-responsive.min.css" />
			
			<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
			<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
			<script src="{$workspace}/js/bootstrap.min.js"></script>
			
			<xsl:comment>[if !(IE)]<![CDATA[><!]]></xsl:comment>
				<!-- link to any non-IE stylesheets/JS -->
			<xsl:comment><![CDATA[<!]]>[endif]</xsl:comment>	
			
			<xsl:comment><![CDATA[[if lt IE 9]><script type="text/javascript" src="]]><xsl:value-of select="$root"/><![CDATA[/workspace/js/html5shiv.min.js"></script><![endif]]]></xsl:comment>
			<xsl:comment><![CDATA[[if (gte IE 6)&(lte IE 8)]><script type="text/javascript" src="]]><xsl:value-of select="$root"/><![CDATA[/workspace/js/selectivizr.min.js"></script><![endif]]]></xsl:comment>
		</head>
		
		<body id="{$current-page}-page">
			<div class="container">
				<header class="header">
					<nav class="nav">
						<xsl:apply-templates select="data/navigation"/>
					</nav> <!-- end .nav -->
				</header>

				<div id="maincontent">
					<xsl:apply-templates/>
				</div> <!-- end #maincontent -->

				<footer class="footer">
					<xsl:value-of select="$this-year"/>					
				</footer> <!-- end .footer -->
			</div> <!-- end .container -->
		</body>
	</html>
</xsl:template>

<xsl:strip-space elements="*"/>

</xsl:stylesheet>