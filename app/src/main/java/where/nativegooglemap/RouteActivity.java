package where.nativegooglemap;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.View;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.UiSettings;
import com.google.android.gms.maps.model.LatLng;

import static where.nativegooglemap.R.id.map;


public class RouteActivity extends FragmentActivity implements OnMapReadyCallback {
    private GoogleMap mMap;


    private Intent routeIntent;
    private Intent currentIntent;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_route);


        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(map);



        mapFragment.getMapAsync(this);


        currentIntent = new Intent(RouteActivity.this, RouteActivity.class);



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
        mMap.setMyLocationEnabled(true);
        UiSettings uiSettings = mMap.getUiSettings(); // 구글맵 UI환경을 가져옴
        uiSettings.setZoomControlsEnabled(true);   // 줌 기능을 설정

        // 位置固定
        LatLng moveCountry = new LatLng(35.6794223, 139.7560526);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(moveCountry, 12));
        test1();

    }

    // 地名を入れて経路を検索
    private void test0() {
        String start = "東京駅";
        String destination = "スカイツリー";

        // 電車:r
        String dir = "r";
        // 車:d
        //String dir = "d";
        // 歩き:w
        //String dir = "w";

        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_VIEW);
        intent.setClassName("com.google.android.apps.maps", "com.google.android.maps.MapsActivity");
        intent.setData(Uri.parse("http://maps.google.com/maps?saddr=" + start + "&daddr=" + destination + "&dirflg=" + dir));
        startActivity(intent);

    }

    // 緯度経度を入れて経路を検索
    private void test1() {

        routeIntent = new Intent(RouteActivity.this, RouteDetailActivity.class);

        routeIntent.setAction(Intent.ACTION_VIEW);
        routeIntent.setClassName("com.google.android.apps.maps", "com.google.android.maps.MapsActivity");
        //intent.setData(Uri.parse("http://maps.google.com/maps?saddr="+src_lat+","+src_ltg+"&daddr="+des_lat+","+des_ltg));
        //startActivity(intent);
    }


    public void btnSheter(View view) {


       // intent.setA = view;
        String src_lat = "35.681382";
        String src_ltg = "139.7660842";
        String des_lat = "35.684752";
        String des_ltg = "139.707937";
        routeIntent.setData(Uri.parse("http://maps.google.com/maps?saddr=" + src_lat + "," + src_ltg + "&daddr=" + des_lat + "," + des_ltg));
        startActivity(routeIntent);
    }



    public void btnRoute(View view) {


    }

    public void btnClear(View view) {
        //routeIntent
    }


}
