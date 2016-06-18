import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RentalZoneProcessor extends AbstractProcessor {
	
	private static final List<RentalZoneDataset> DATENSAETZE = Arrays.asList(RentalZoneDataset.values());

	private static final int HAL = DATENSAETZE.indexOf(RentalZoneDataset.RENTAL_ZONE_HAL_ID);

	private static final int NAME = DATENSAETZE.indexOf(RentalZoneDataset.RENTAL_ZONE_GROUP);

	private static final int LAT = DATENSAETZE.indexOf(RentalZoneDataset.RENTAL_ZONE_Y_COORDINATE);

	private static final int LNG = DATENSAETZE.indexOf(RentalZoneDataset.RENTAL_ZONE_X_COORDINATE);
	
	private static final RentalZoneProcessor INSTANCE = new RentalZoneProcessor();
	
	private static final RentalZoneRegistry ZONES = RentalZoneRegistry.getInstance();
	
	protected RentalZoneProcessor(){
		//
	}
	
	public static RentalZoneProcessor getInstance(){
		return INSTANCE;
	}
	
	@Override
	public void process(String[] data) {	
		String rawLat = read(data, LAT);

		// we are only interested if geo coordinates are available
		if(null != rawLat){
			Integer hal = Integer.parseInt(read(data, HAL));
			Double lat = convertGeo(rawLat);
			Double lng = convertGeo(read(data, LNG));
			ZONES.addZone(new RentalZone(hal, read(data, NAME), lat, lng));
		}	
	}

}
