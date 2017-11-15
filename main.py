#####################################################################
# @author Navdeep Singh Bagga,
#         Information Manager, Winter-Fall 2017
#   @info Website for U-M School of Information's masters student
#         association containing important info about the org as well
#         as quick resources to connect to the school administration.
#   @term Fall 2017
#####################################################################



# Import dependecies:
import os
import jinja2
import webapp2
import logging


# Setup the Jinja2 environment:
JINJA_ENVIRONMENT = jinja2.Environment(
    loader = jinja2.FileSystemLoader( os.path.dirname( __file__ ) + "/" ),
    extensions = [ "jinja2.ext.autoescape" ],
    autoescape = True )


logging.info( "Booting up the web server....." )


# Handler for `/`
# -------------------------------------------------------------------
class IndexHandler( webapp2.RequestHandler ):
    def get( self ):
        self.response.write( JINJA_ENVIRONMENT.get_template( "index.html" ).render() )


# App routes:
app = webapp2.WSGIApplication([
    ( "/", IndexHandler )
], debug = True )


logging.info( "Web server boot-up successful!" )