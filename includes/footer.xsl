<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="footer">
		<div class="container">
			<footer class="footer">
				<xsl:value-of select="$this-year" />					
			</footer>
		</div>
	</xsl:template>

</xsl:stylesheet>