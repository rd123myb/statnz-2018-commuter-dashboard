import plotly.express as px
import pandas as pd
import plotly.graph_objects as go

# NOTE: map-tiler may allow for a bit more customization

mapbox_accesstoken = open(".mapbox_token").read()
lat = -34.50545276
long = 172.77554997
HillCrestLat = -36.79435426
HillCrestLon = 174.73620436
free_style = [
    "open-street-map",
    "carto-positron",
    "carto-darkmatter",
    "stamen-terrain",
    "stamen-toner",
    "stamen-watercolor",
]
# carto: subtle, less detailed
# carto-dark: really dark,...
# stamen terrain stuff not suitable: stame-terr, stamen-toner (black and white)
token_style = [
    "basic",
    "streets",
    "outdoors",
    "light",
    "dark",
    "satellite",
    "satellite-streets",
]
# basic: looks really nice (has a urban-planning feel to it)
# outdoors: no houses shown, really clear
# streets: may be cluttered since it's shows road names, signs, etc.

# can also use meshmap from statnz:
# api key = 3d78b0edcb904f298c10ff9d288d550b
# here's the link: https://help.koordinates.com/query-api-and-web-services/create-webmap-using-tile-services-and-mapbox-gl/
# statnz publishes their map on koordinates.com
# think of what layers go on top


# get layer from statnz
NZ_STAT_API_KEY = "3d78b0edcb904f298c10ff9d288d550b"
LAYER_ID = "92212"
source = "https://koordinates-tiles-a.global.ssl.fastly.net/services;key=3d78b0edcb904f298c10ff9d288d550b/tiles/v4/layer=92212/EPSG:3857/{z}/{x}/{y}.png"


stat_areas = pd.read_csv('./csv/SA2-conversion.csv')
fig = px.scatter_mapbox(
    stat_areas,
    lat="LATITUDE",
    lon="LONGITUDE",
    zoom=5,
    width=600,
    height=600,
)
fig.update_layout(
    mapbox_accesstoken=mapbox_accesstoken,
    mapbox_style="light",
    mapbox_layers=[
        {
            "below": "traces",
            "sourcetype": "raster",  # NOTE: specify raster adds a red overlay to the map!
            "source": [
                source
            ],
        }
    ],
)
fig.update_layout(margin={"r": 0, "t": 0, "l": 0, "b": 0})
fig.show()
