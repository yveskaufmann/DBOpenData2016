import java.util.Collection;
import java.util.HashMap;

public class RentalZoneRegistry {
	
	private static final RentalZoneRegistry INSTANCE = new RentalZoneRegistry();
		
	private HashMap<String, RentalZone> zonesByName = new HashMap<>();
	
	private HashMap<Integer, RentalZone> zonesByHal = new HashMap<>();

	
	protected RentalZoneRegistry(){
		//
	}
	
	public static RentalZoneRegistry getInstance(){
		return INSTANCE;
	}

	public void addZone(RentalZone zone) {
		zonesByHal.put(zone.getHal(), zone);
		zonesByName.put(zone.getBezeichnung(), zone);
	}
	
	public Collection<RentalZone> getZones() {
		return zonesByName.values();
	}
	
	public RentalZone findZoneByHal(Integer hal) {
		return zonesByHal.get(hal);
	}
	
	public RentalZone findZoneByName(String name) {
		return zonesByName.get(name);
	}

	public Integer getNumberOfZones() {
		return getZones().size();
	}

}
