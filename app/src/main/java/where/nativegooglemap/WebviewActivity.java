package where.nativegooglemap;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class WebviewActivity extends Activity implements LocationListener {

    private LocationManager mLocationManager;

    private double currentLat = 35.681504;
    private double currentLng = 139.737704;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);

        //this.checkPermission();
        WebView webview = (WebView) findViewById(R.id.webView);
        webview.clearCache(true);
        webview.getSettings().setJavaScriptEnabled(true);
        webview.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
        //webview.loadUrl("file:///android_asset/leaflet_sample.html");


        webview.loadUrl("file:///android_asset/test.html");

        // GPS
    //    mLocationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
//        boolean gpsFlg = mLocationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
//
//        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
//                && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
//            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION,}, 1000);
//            return;
//        }

        //mLocationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 10, this);
    }


    private void checkPermission() {
        // 必要な権限がすでにある場合にはokPermissionを呼び出す
        // 権限が足りない場合はrequestPermissionsで要求．結果はonRequestPermissionsResultに来ます

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (checkSelfPermission(android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED ||
                    checkSelfPermission(android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED ||
                    checkSelfPermission(Manifest.permission.INTERNET) != PackageManager.PERMISSION_GRANTED ||
                    checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED ||
                    checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED
                    ) {
                requestPermissions(new String[]{
                        android.Manifest.permission.ACCESS_FINE_LOCATION,
                        android.Manifest.permission.ACCESS_COARSE_LOCATION,
                        android.Manifest.permission.INTERNET,
                        android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
                        android.Manifest.permission.READ_EXTERNAL_STORAGE
                }, 1);
            } else {
                // 全部許可が通っているパターン
            }
        }
    }

    @Override
    public void onLocationChanged(Location location) {
//        this.currentLat = location.getLatitude();
//        this.currentLng = location.getLongitude();
//
//        WebView webview = (WebView) findViewById(R.id.webView);
//        webview.loadUrl("javascript:MapManager.setPoint(" + this.currentLat + "," + this.currentLng + ");");
    }

    @Override
    public void onProviderDisabled(String provider) {
    }

    @Override
    public void onProviderEnabled(String provider) {
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
    }
}
