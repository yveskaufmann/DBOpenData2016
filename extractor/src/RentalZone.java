
public class RentalZone {
	
	private Integer hal;
	
	private Double lat;
	
	private Double lng;
	
	private String bezeichnung;
	
	private int rentalStarts = 0;
	
	private int rentalEnds = 0;
	
	public RentalZone(){
		//
	}
	
	public RentalZone(Integer hal, String bezeichnung, Double lat, Double lng){
		this.hal = hal;
		this.bezeichnung = bezeichnung;
		this.lat = lat;
		this.lng = lng;
	}

	public Integer getHal() {
		return hal;
	}

	public void setHal(Integer hal) {
		this.hal = hal;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public String getBezeichnung() {
		return bezeichnung;
	}

	public void setBezeichnung(String bezeichnung) {
		this.bezeichnung = bezeichnung;
	}

	public int getRentalStarts() {
		return rentalStarts;
	}

	public void setRentalStarts(int rentalStarts) {
		this.rentalStarts = rentalStarts;
	}

	public int getRentalEnds() {
		return rentalEnds;
	}

	public void setRentalEnds(int rentalEnds) {
		this.rentalEnds = rentalEnds;
	}

	public void registerRentalStart() {
		rentalStarts++;
	}

	public void registerRentalFinish() {
		rentalEnds++;
	}

}
