from geopy.geocoders import Nominatim
import pandas as pd
import time

geolocator = Nominatim(user_agent="dataiku_geocoder")

def geocode_address(addr):
    try:
        loc = geolocator.geocode(addr)
        time.sleep(1)
        if loc:
            return loc.latitude, loc.longitude
    except:
        pass
    return None, None

df = input_dataset.get_dataframe()

df[['geo_latitude', 'geo_longitude']] = df['address_full'].apply(
    lambda x: pd.Series(geocode_address(x))
)

output_dataset.write_with_schema(df)
