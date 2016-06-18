
public class RentalRoute {

	RentalZone a;
	
	RentalZone b;
	
	public RentalRoute(RentalZone x, RentalZone y){
		// build deterministic pair
		if(x.getLat() > y.getLat()) {
			a = x;
			b = y;
		} else {
			b = x;
			a = y;
		}
	}

	public RentalZone getA() {
		return a;
	}

	public void setA(RentalZone a) {
		this.a = a;
	}

	public RentalZone getB() {
		return b;
	}

	public void setB(RentalZone b) {
		this.b = b;
	}
	
	public boolean equals(Object other) {
		if(other instanceof RentalRoute) {
			return equals((RentalRoute) other);
		}
		return false;
	}
	
	public boolean equals(RentalRoute other) {
		return other.a.getHal().equals(a.getHal()) && other.b.getHal().equals(b.getHal());
	}
	
	public int hashCode() {
		return 4711;
	}
	
}
