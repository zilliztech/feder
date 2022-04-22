from IPython.display import display, HTML
import random

class FederPy:
    def __init__(self, indexFile, indexSource, width=1000, height=620, mediaType="", mediaUrls=[]):
        self.indexFile = indexFile
        self.indexSource = indexSource

        self.container = "feder-container-%s" % random.randint(0, 10000000)

        self.federjs = "https://unpkg.com/@zilliz/feder"
        # self.federjs = "http://192.168.0.101:12357/feder_esm.js"

        self.actionJs = ""
        self.width = width
        self.height = height
        self.mediaType = mediaType
        self.mediaUrls = mediaUrls

    def getDiv(self):
        return '<div id="%s" />' % self.container

    def getInitJs(self):
        return """
import { Feder } from "%s"
// console.log(Feder)

const mediaUrls = [%s]
const mediaCallback = (rowId) => rowId in mediaUrls ? mediaUrls[rowId] : null

const feder = new Feder({
    filePath: "%s",
    source: "%s",
    domSelector: "#%s",
    viewParams: {
        width: "%s",
        height: "%s",
        mediaType: "%s",
        mediaCallback,
    }
})
        """ % (self.federjs, ",".join(["'%s'" % url for url in self.mediaUrls]), self.indexFile, self.indexSource, self.container, self.width, self.height, self.mediaType)

    def overview(self, isDisplay=True):
        self.actionJs = "feder.overview()"
        if isDisplay:
            self.showHtml()
        else:
            return self.getHtml()

    def searchRandTestVec(self, isDisplay=True):
        self.actionJs = "feder.searchRandTestVec()"
        if isDisplay:
            self.showHtml()
        else:
            return self.getHtml()

    def getJs(self):
        return """
%s
%s
        """ % (self.getInitJs(), self.actionJs)

    def getHtml(self):
        return """
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#ffffff" />
  <title>Feder</title>
</head>

<body style="background: #000">
  %s
</body>

<script type="module">
%s
</script>

</html>        
        
        
""" % (self.getDiv(), self.getJs())

    def showHtml(self):
        display(HTML(self.getHtml()))
