import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class RouteRegistry {
	
	private static final RouteRegistry INSTANCE = new RouteRegistry();
	
	private Map<RentalRoute, Integer> routes = new HashMap<>(); 
	
	private static final double INTERPOLATIONSSTUFE = 0.01;

	protected RouteRegistry() {
		//
	}

	public static RouteRegistry getInstance(){
		return INSTANCE;
	}
	
	public void addRoute(RentalZone a, RentalZone b) {
		RentalRoute route = new RentalRoute(a, b);
		
		if(routes.containsKey(route)) {
			routes.put(route, new Integer(routes.get(route).intValue() + 1));
		} else {
			routes.put(route, 1);
		}
	}
	
	public Map<RentalRoute, Integer> getRoutes() {
		return this.routes;
	}

	public Collection<RentalZone> interpolateVirtualZones() {
		List<RentalZone> virtualZones = new ArrayList<>();
		
		int pos=0;
		int anz=this.getRoutes().entrySet().size();
		
		for(Entry<RentalRoute, Integer> route : this.getRoutes().entrySet()) {
			
			if(pos++%500 == 0) System.out.println("interpoliere route " + pos + " von " + anz);
			
			Integer anzahl = route.getValue();
			RentalRoute actRoute = route.getKey();
			RentalZone a = actRoute.getA();
			RentalZone b = actRoute.getB();
			RentalZone copyA = new RentalZone(a.getHal(),a.getBezeichnung(), a.getLat(), a.getLng());
			copyA.setRentalStarts(anzahl);
			virtualZones.add(copyA );
			
			double deltaLat = (b.getLat() - a.getLat());
			double deltaLng = (b.getLng() - a.getLng());
			double deltaPyth = Math.sqrt(deltaLat*deltaLat+deltaLng*deltaLng);
			int anzahlInterpolationen = (int) Math.floor(deltaPyth / INTERPOLATIONSSTUFE);
			double interpDeltaLat = deltaLat / anzahlInterpolationen;
			double interpDeltaLng = deltaLng / anzahlInterpolationen;
			
			double lat = a.getLat();
			double lng = a.getLng();
			
			if(anzahlInterpolationen == 0 && !a.getHal().equals(b.getHal())) anzahlInterpolationen = 1;
			if(anzahlInterpolationen > 20) anzahlInterpolationen = 20;
			
			for(int i = 0; i < anzahlInterpolationen; i++) {
				RentalZone interpoliert = new RentalZone();
				interpoliert.setRentalStarts(anzahl);
				interpoliert.setLat(lat);
				lat += interpDeltaLat;
				interpoliert.setLng(lng);
				lng += interpDeltaLng;
				interpoliert.setBezeichnung("interp_"+i);
				virtualZones.add(interpoliert );	
			}
			
			RentalZone copyB = new RentalZone(b.getHal(),b.getBezeichnung(), b.getLat(), b.getLng());
			copyB.setRentalStarts(anzahl);
			
			virtualZones.add(copyB);
		}
		
		return virtualZones;
	}
	
}
