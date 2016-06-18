import java.util.Arrays;
import java.util.List;

public class BookingProcessor extends AbstractProcessor {
	
	private static final List<BookingDataset> DATENSAETZE = Arrays.asList(BookingDataset.values());

	private static final int START_HAL = DATENSAETZE.indexOf(BookingDataset.RENTAL_ZONE_HAL_ID);
		
	private static final int ENDE_NAME = DATENSAETZE.indexOf(BookingDataset.END_RENTAL_ZONE_GROUP);
	
	private static final int SERVICE_BOOKING = DATENSAETZE.indexOf(BookingDataset.SERVICE_BOOKING_X);

	private static final String IS_SERVICE_BOOKING = "1";
	
	private static final BookingProcessor INSTANCE = new BookingProcessor();
	
	private static final RentalZoneRegistry ZONE_REGISTRY = RentalZoneRegistry.getInstance();

	
	protected BookingProcessor(){
		//
	}
	
	public static BookingProcessor getInstance(){
		return INSTANCE;
	}
	
	@Override
	public void process(String[] data) {
				
		if(IS_SERVICE_BOOKING.equals(read(data, SERVICE_BOOKING))) {
			// we are just interested in customer bookings
			return;
		}
		
		RentalZone startZone = null;
		try{
			startZone = ZONE_REGISTRY.findZoneByHal(Integer.parseInt(read(data, START_HAL)));
		} catch(NumberFormatException ex){
			// field not filled, therefore skipping
			return;
		}
		
		RentalZone finishZone = ZONE_REGISTRY.findZoneByName(read(data,ENDE_NAME));

		if(null != startZone && null != finishZone) {
			startZone.registerRentalStart();
			finishZone.registerRentalFinish();
		}
		
	}

}
