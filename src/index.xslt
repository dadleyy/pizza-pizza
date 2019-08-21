<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" doctype-system="about:legacy-compat" />
  <xsl:param name="script-src" />
  <xsl:param name="style-src" />
  <xsl:template match="app">
    <html lang="en">
      <head>
        <title><xsl:value-of select="title" /></title>
        <link rel="stylesheet" href="{$style-src}" />
        <xsl:for-each select="meta/tag" >
          <meta>
            <xsl:attribute name="content">
              <xsl:value-of select="value" />
            </xsl:attribute>
            <xsl:attribute name="name">
              <xsl:value-of select="name" />
            </xsl:attribute>
          </meta>
        </xsl:for-each>
        <script src="{$script-src}"></script>
      </head>
      <body>
        <script><xsl:value-of select="boot" /></script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
