package where.nativegooglemap;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.UiSettings;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.PolylineOptions;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static where.nativegooglemap.R.id.map;


public class RouteDetailActivity extends FragmentActivity implements OnMapReadyCallback {
    Location mLastLocation;
    double lat; // 위도
    double lon; // 경도
    GoogleApiClient mGoogleApiClient;
    int iAreaCount = 0;
    private final static int ALPHA_ADJUSTMENT = 0x77000000;

    private GoogleMap mMap;
    private PolylineOptions pathLine;
    private LatLng imhere = new LatLng(35.6816793, 139.7376308);
    private LatLng endHere;

    private ArrayList<LatLng> arAreaList = new ArrayList<LatLng>();

    private LatLng curHere;

    StringBuffer json_data = new StringBuffer();
    List<HashMap<String, String>> list_loc_point = new ArrayList<HashMap<String, String>>();
    //HashMap<String, String> loc_point = new HashMap<String, String>();
    private String sUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyCFvkHbfHehqG9GsvesCXKyUO1ZBefZmvs";
    private LocationManager mLocationManager;



    private void initData() {

        arAreaList.add(new LatLng(35.681298, 139.7662469));
        arAreaList.add(new LatLng(35.6954859, 139.7489657));
        arAreaList.add(new LatLng(35.7037367, 139.6961126));
        arAreaList.add(new LatLng(35.7016443, 139.6391655));
        arAreaList.add(new LatLng(35.6669717, 139.6225846));
        arAreaList.add(new LatLng(35.6659645, 139.737514));
//        arAreaList.add(new LatLng(35.344163, 139.509301));
//        arAreaList.add(new LatLng(35.343962, 139.509451));
//        arAreaList.add(new LatLng(35.343787, 139.509559));
//        arAreaList.add(new LatLng(35.343586, 139.50972));
//        arAreaList.add(new LatLng(35.343393, 139.509934));

        endHere = new LatLng(arAreaList.get(0).latitude, arAreaList.get(0).longitude);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_route);

        // 避難所設置今後自動読込予定
        this.initData();
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(map);

        mapFragment.getMapAsync(this);


        // 現在位置が変わる始点でもう一回偏在位置を更新する
        LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        LocationListener locationListener = new LocationListener() {
            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {
                // TODO Auto-generated method stub
            }

            @Override
            public void onProviderEnabled(String provider) {
                // TODO Auto-generated method stub
            }

            @Override
            public void onProviderDisabled(String provider) {
                // TODO Auto-generated method stub
            }

            @Override
            public void onLocationChanged(Location location) {
                // TODO Auto-generated method stub
                Toast.makeText(getApplicationContext(), "Lat::" + location.getLatitude() + "\nLongi::" + location.getLongitude(), Toast.LENGTH_SHORT).show();
                curHere = new LatLng(location.getLatitude(), location.getLongitude());
            }
        };
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }

        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, locationListener);
        locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, locationListener);

    }

    @Override
    protected void onResume() {
        super.onResume();
        // destroy all menu and re-call onCreateOptionsMenu
    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    // 最初から表示する
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        mMap.setMyLocationEnabled(true);
        UiSettings uiSettings = mMap.getUiSettings(); // 구글맵 UI환경을 가져옴
        uiSettings.setZoomControlsEnabled(true);   // 줌 기능을 설정

        // 位置固定
        LatLng moveCountry = new LatLng(35.6794223, 139.7560526);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(moveCountry, 12));


//        Marker colosseoMarker  = mMap.addMarker(new MarkerOptions()
//            .position(colosseo)
//            .title("Start")
//            .snippet("poi")
//            .icon(BitmapDescriptorFactory.fromResource(R.drawable.green)));

    }

    public void btnRoute(View view) {
        initCrear();
        this.parseData();
        this.renderMap();

    }

    public void btnClear(View view) {
        //routeIntent
        mMap.clear();
        list_loc_point = new ArrayList<HashMap<String, String>>();
        json_data = new StringBuffer();
    }

    public void btnSheter(View view) {
        if (iAreaCount >= arAreaList.size() - 1) {
            iAreaCount = 0;
        } else {
            iAreaCount++;
        }
        endHere = new LatLng(arAreaList.get(iAreaCount).latitude, arAreaList.get(iAreaCount).longitude);

        initCrear();
        this.parseData();
        this.renderMap();
    }

    public void initCrear() {
        mMap.clear();
        list_loc_point = new ArrayList<HashMap<String, String>>();
        json_data = new StringBuffer();
        pathLine = null;
    }

    public void renderMap() {
        if (pathLine != null) {
            pathLine = null;
        }
        pathLine = new PolylineOptions();

        ArrayList<LatLng> arrayPoints = new ArrayList<LatLng>();

        for (int i = 0; i < list_loc_point.size(); ++i) {
            Double dLat = Double.parseDouble(list_loc_point.get(i).get("lat"));
            Double dLng = Double.parseDouble(list_loc_point.get(i).get("lng"));
            arrayPoints.add(new LatLng(dLat, dLng));

        }

        pathLine.color(Color.RED - ALPHA_ADJUSTMENT);
        pathLine.width(7);
        pathLine.addAll(arrayPoints);
        mMap.addPolyline(pathLine);

    }


    public void parseForJson() throws JSONException {
        JSONObject json = new JSONObject(json_data.toString());

        JSONArray jarray = json.getJSONArray("routes");
        JSONObject routes = jarray.getJSONObject(0); //routes를 오프젝트로 만듬

        JSONArray arr_legs = routes.getJSONArray("legs"); // routes -> legs 노드로 이동
        JSONObject legs = arr_legs.getJSONObject(0);


        JSONArray arr_steps = legs.getJSONArray("steps"); // routes -> legs -> steps 노드로 이동

        for (int i = 0; i < arr_steps.length(); i++) {
            // 결과별로 결과 object 얻기
            JSONObject jtmp = arr_steps.getJSONObject(i);
            JSONObject end_location = jtmp.getJSONObject("end_location");

            HashMap<String, String> loc_point = new HashMap<String, String>();
            loc_point.put("lat", end_location.getString("lat"));
            loc_point.put("lng", end_location.getString("lng"));
            list_loc_point.add(loc_point);

        }
    }


    public void getJsonData(String urlStr) {
        String line = null;
        BufferedReader buffer = null;
        try {
            URL url = new URL(urlStr);
            HttpURLConnection urlConn = (HttpURLConnection) url.openConnection();
            //IO 스트림을 이용해 데이타를 읽는다.
            buffer = new BufferedReader(new InputStreamReader(urlConn.getInputStream()));
            while ((line = buffer.readLine()) != null) {
                json_data.append(line);
            }
        } catch (Exception e) {
            // TODO: handle exception
            Log.d("Test", "catch : ", e);
        } finally {
            try {
                buffer.close();
            } catch (Exception e2) {
                // TODO: handle exception
                Log.d("Test", "catch : ", e2);
            }
        }
    }

    public void parseData() {

        //String url = "https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyCFvkHbfHehqG9GsvesCXKyUO1ZBefZmvs";
        String jsonURL = "http://maps.google.com/maps/api/directions/json?";
        final StringBuffer sBuf = new StringBuffer(jsonURL);

        sBuf.append("origin=");
        sBuf.append(curHere.latitude);
        sBuf.append(',');
        sBuf.append(curHere.longitude);
        sBuf.append("&destination=");
        sBuf.append(endHere.latitude);
        sBuf.append(',');
        sBuf.append(endHere.longitude);
        sBuf.append("&sensor=true&mode=walking");
        getJsonData(sBuf.toString());
        try {
            parseForJson();
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            Log.d("Test", "error : ", e);
        }
    }

}
