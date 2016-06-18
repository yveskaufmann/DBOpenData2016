
public abstract class AbstractProcessor implements IDataProcessor {

	protected String read(String[] data, int which) {
		if(which < data.length) {
			String retrievedData = data[which];
			
			String dataReturn = retrievedData;
			// remove quotes
			if(retrievedData.startsWith("\"")){
				dataReturn = retrievedData.substring(1, retrievedData.length()-1);
			}
			return dataReturn;
		}
		return null;
	}
	
	protected Double convertGeo(String raw) {
		return Double.parseDouble(raw.replace(',', '.'));
	}
	
}
