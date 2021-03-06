import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Collection;

public class CAB {
	
	private static final String FILE_PATH = "./res/";
	
	private static final String RENTAL_ZONE_FILE = "HACKATHON_RENTAL_ZONE_CALL_A_BIKE.csv";

	private static final String BOOKING_FILE = "HACKATHON_BOOKING_CALL_A_BIKE.csv";

	private static final RentalZoneRegistry ZONE_REGISTRY = RentalZoneRegistry.getInstance();


	public static void main(String[] args) {

		processFile(RENTAL_ZONE_FILE, RentalZoneProcessor.getInstance());

		System.out.println(ZONE_REGISTRY.getNumberOfZones() + " rental zones with coordinates found");

		processFile(BOOKING_FILE, BookingProcessor.getInstance());		
		
		printJsonOutput("bookingStarts", DataOfInterest.STARTS, ZONE_REGISTRY.getZones());
		printJsonOutput("bookingEnds", DataOfInterest.ENDS, ZONE_REGISTRY.getZones());
		
		printJsonOutput("bookingSinks", DataOfInterest.SINKS, ZONE_REGISTRY.getZones());
		printJsonOutput("bookingSources", DataOfInterest.SOURCES, ZONE_REGISTRY.getZones());
		
		
		printJsonOutput("interpolated", DataOfInterest.INTERPOLATION, RouteRegistry.getInstance().interpolateVirtualZones());

		System.out.println("Finished.");
	}

	private static void printJsonOutput(String name, DataOfInterest dataType, Collection<RentalZone> zones) {
		try {
			PrintWriter writer = new PrintWriter(FILE_PATH + name + ".js");
			writer.println(createJsonOutput(name, dataType, zones));
			writer.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	private static String createJsonOutput(String varName, DataOfInterest what, Collection<RentalZone> zones) {
		StringBuilder dataJson = new StringBuilder();
		
		int pos = 0;
		int max = -1;
		for(RentalZone zone : zones) {
			int actualData = extractDataOfInterest(zone, what);
			
			if(actualData <= 0) continue;
			if(actualData > max) max = actualData;

			dataJson.append("\t\t{\"lat\": ");
			dataJson.append(zone.getLat());
			dataJson.append(", \"lng\": ");
			dataJson.append(zone.getLng());
			dataJson.append(", \"count\": ");
			dataJson.append(actualData);
			dataJson.append("}");
			if(++pos < zones.size()) dataJson.append(',');
			dataJson.append(" // ");
			dataJson.append(zone.getBezeichnung());
			dataJson.append("\n");
		}
		
		return "var "+varName+" = {\n\t\"max\": " + max + ",\n\t\"data\": [\n" + dataJson.toString() + "\n\t]\n};";		
	}

	private static int extractDataOfInterest(RentalZone zone, DataOfInterest what) {
		switch(what){
		case STARTS:
		case INTERPOLATION:
			return zone.getRentalStarts();
		
		case ENDS:
			return zone.getRentalEnds();
			
		case SINKS:
			int sinks = zone.getRentalEnds() - zone.getRentalStarts();
			if(sinks < 0) return -1;
			return sinks;
			
		case SOURCES:
			int source = zone.getRentalStarts() - zone.getRentalEnds();
			if(source < 0) return -1;
			return source;
			
		default:
			return -1;
		}
		
	}

	private static void processFile(String csvFile, IDataProcessor processor) {
		BufferedReader reader = null;
		String line = "";
		try {
			reader = new BufferedReader(new InputStreamReader(new FileInputStream(FILE_PATH + csvFile), "latin1"));
			reader.readLine(); // skip headings
			while ((line = reader.readLine()) != null) {
				String[] data = line.split(";");
				processor.process(data);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}		
	}

}
