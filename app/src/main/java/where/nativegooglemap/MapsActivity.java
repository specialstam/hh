package where.nativegooglemap;

import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.SeekBar;
import android.widget.Spinner;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.UiSettings;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Polygon;
import com.google.android.gms.maps.model.PolygonOptions;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.android.gms.maps.model.TileOverlay;
import com.google.android.gms.maps.model.TileOverlayOptions;
import com.google.android.gms.maps.model.TileProvider;
import com.google.android.gms.maps.model.UrlTileProvider;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;

import static android.util.Log.i;
import static where.nativegooglemap.R.id.map;
import static where.nativegooglemap.R.id.spinner;


public class MapsActivity extends FragmentActivity implements OnMapReadyCallback, SeekBar.OnSeekBarChangeListener {

    private GoogleMap mMap;
    private final static int ALPHA_ADJUSTMENT = 0x77000000;
    private Spinner posNameSpinner;
    private ArrayList<TestData> arTestData;
    private ArrayList<LatLng> arLatLngArea;
    private ArrayList<Polygon> arPolygon;
    private Integer iDangerBtnClickCount;


    private TileOverlay mMoonTiles;
    private SeekBar mTransparencyBar;
    private static final int TRANSPARENCY_MAX = 100;

    /**
     * This returns moon tiles.
     */
    private static final String MOON_MAP_URL_FORMAT =
            "http://mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw/%d/%d/%d.jpg";


    class TestData {
        private String titleName = null;
        private String titleComment = null;
        private Double yPos = null;
        private Double xPos = null;

        TestData() {

        }

        TestData(String titleName_, String titleComment_, String yPos_, String xPos_) {
            this.titleName = titleName_;
            this.titleComment = titleComment_;
            this.yPos = Double.parseDouble(yPos_);
            this.xPos = Double.parseDouble(xPos_);
        }

        public Double getYpos() {
            return yPos;
        }

        public Double getXpos() {
            return xPos;
        }

        public String geTitleComment() {
            return titleComment;
        }
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_maps);


        mTransparencyBar = (SeekBar) findViewById(R.id.transparencySeekBar);
        mTransparencyBar.setMax(TRANSPARENCY_MAX);
        mTransparencyBar.setProgress(0);

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(map);

        // Android6からは権限周りの要求が必要なので，まずは要求
        //checkPermission();
//        setSpinner();
//        // data読込
//        getCsvPosData();

        mapFragment.getMapAsync(this);


    }

    private void checkPermission() {
        // 必要な権限がすでにある場合にはokPermissionを呼び出す
        // 権限が足りない場合はrequestPermissionsで要求．結果はonRequestPermissionsResultに来ます

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (checkSelfPermission(android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED ||
                    checkSelfPermission(android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED
                    ) {
                requestPermissions(new String[]{
                        android.Manifest.permission.ACCESS_FINE_LOCATION,
                        android.Manifest.permission.ACCESS_COARSE_LOCATION,
                }, 1);
            } else {
                // 全部許可が通っているパターン
            }
        }
    }


    @Override
    protected void onResume() {
        super.onResume();
        // destroy all menu and re-call onCreateOptionsMenu
        //getActivity().invalidateOptionsMenu()
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


        // seekbar 関連 .start
        TileProvider tileProvider = new UrlTileProvider(256, 256) {
            @Override
            public synchronized URL getTileUrl(int x, int y, int zoom) {
                // The moon tile coordinate system is reversed.  This is not normal.
                int reversedY = (1 << zoom) - y - 1;
//                String s = String.format(Locale.US, MOON_MAP_URL_FORMAT, zoom, x, reversedY);
//                URL url = null;
//                try {
//                    url = new URL(s);
//                } catch (MalformedURLException e) {
//                    throw new AssertionError(e);
//                }
                return null;
            }
        };

        mMoonTiles = mMap.addTileOverlay(new TileOverlayOptions().tileProvider(tileProvider));
        mTransparencyBar.setOnSeekBarChangeListener(this);

        // seekbar 関連　.end

        // 位置固定(藤沢)
        LatLng moveCountry = new LatLng(35.375499, 139.461690);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(moveCountry, 12));

        UiSettings uiSettings = mMap.getUiSettings(); // 구글맵 UI환경을 가져옴
        uiSettings.setZoomControlsEnabled(true);   // 줌 기능을 설정


        this.mapPoliGonShow();
        // this.mapShow();


    }

    public void mapPoliGonSmallShow() {

        arPolygon = new ArrayList<Polygon>();

        PolygonOptions rectOptions = new PolygonOptions()
                .add(
//                        new LatLng(35.356043, 139.462950),
//                        new LatLng(35.346539, 139.468412),
//                        new LatLng(35.333271, 139.497423),
//                        new LatLng(35.354756, 139.506769)

                        new LatLng(35.376378, 139.468955),//startth
                        new LatLng(35.359472, 139.542248),//rightth


                        new LatLng(35.346705, 139.559028),//gg
                        new LatLng(35.342868, 139.548658),//gg
                        new LatLng(35.342359, 139.546164),//gg


                        new LatLng(35.341386, 139.548637),//gg
                        new LatLng(35.340161, 139.555042),//gg
                        new LatLng(35.341025, 139.542762),//gg

                        new LatLng(35.343548, 139.542541),//gg
                        //new LatLng(35.344484, 139.564495),//おかしてん

                        new LatLng(35.340589, 139.538503),//gg

                        new LatLng(35.339340, 139.538503),//gg
                        //new LatLng(35.335892, 139.539211),//gg
                        //   new LatLng(35.334290, 139.540917),//gg


                        new LatLng(35.292996, 139.471683)//endth


                );


        rectOptions.fillColor(Color.YELLOW - ALPHA_ADJUSTMENT);
        rectOptions.strokeColor(Color.RED);
        rectOptions.strokeWidth(5);
        arPolygon.add(mMap.addPolygon(rectOptions));


        for (int i = 0; i < arPolygon.size(); ++i) {
            arPolygon.get(i).setFillColor(Color.BLUE - ALPHA_ADJUSTMENT);
        }

    }


    public void mapPoliGonShow() {

        arPolygon = new ArrayList<Polygon>();

        PolygonOptions rectOptions = new PolygonOptions()
                .add(
                        new LatLng(35.346316, 139.509242),
                        new LatLng(35.346868, 139.510740),
                        new LatLng(35.347495, 139.511650),
                        new LatLng(35.348603, 139.511203),
                        new LatLng(35.349507, 139.511241),
                        new LatLng(35.350016, 139.510396),
                        new LatLng(35.349151, 139.509710),
                        new LatLng(35.349753, 139.508670),
                        new LatLng(35.351906, 139.508754),
                        new LatLng(35.350979, 139.507121),
                        new LatLng(35.351077, 139.507276),
                        new LatLng(35.351134, 139.507257),
                        new LatLng(35.351326, 139.507036),
                        new LatLng(35.351741, 139.507325),
                        new LatLng(35.351796, 139.507332),
                        new LatLng(35.351888, 139.507105),
                        new LatLng(35.351991, 139.506904),
                        new LatLng(35.351809, 139.506809),
                        new LatLng(35.351639, 139.506693),
                        new LatLng(35.351886, 139.506147),
                        new LatLng(35.352026, 139.506189),
                        new LatLng(35.352115, 139.505798),
                        new LatLng(35.351885, 139.505536),
                        new LatLng(35.350889, 139.503523),
                        new LatLng(35.3532, 139.50496),
                        new LatLng(35.355731, 139.502517),
                        new LatLng(35.357122, 139.495479),
                        new LatLng(35.358496, 139.492615),
                        new LatLng(35.358422, 139.491005),
                        new LatLng(35.358807, 139.489308),
                        new LatLng(35.358391, 139.489142),
                        new LatLng(35.359556, 139.485455),
                        new LatLng(35.360413, 139.485578),
                        new LatLng(35.365698, 139.48818),
                        new LatLng(35.371068, 139.488379),
                        new LatLng(35.373658, 139.489967),
                        new LatLng(35.378042, 139.492439),
                        new LatLng(35.381417, 139.487244),
                        new LatLng(35.383823, 139.484922),
                        new LatLng(35.386473, 139.484445),
                        new LatLng(35.387854, 139.483532),
                        //new LatLng(35.389372, 139.481057),
                        new LatLng(35.389147, 139.481184),
                        new LatLng(35.391252, 139.479562),
                        new LatLng(35.393744, 139.478039),
                        new LatLng(35.395203, 139.47722),
                        new LatLng(35.396545, 139.477008),
                        new LatLng(35.398963, 139.477167),
                        new LatLng(35.402, 139.47474),
                        new LatLng(35.40374, 139.475336),
                        new LatLng(35.408292, 139.475543),
                        new LatLng(35.412694, 139.476118),
                        new LatLng(35.414438, 139.475829),
                        new LatLng(35.416101, 139.477114),
                        new LatLng(35.417124, 139.477495),
                        new LatLng(35.419559, 139.477854),
                        new LatLng(35.420835, 139.475987),
                        new LatLng(35.421998, 139.474163),
                        new LatLng(35.422348, 139.473144),
                        new LatLng(35.423563, 139.470923),
                        new LatLng(35.423651, 139.466929),
                        new LatLng(35.42345, 139.464824),
                        new LatLng(35.423433, 139.463451),
                        new LatLng(35.42317, 139.462378),
                        new LatLng(35.422821, 139.461884),
                        new LatLng(35.422244, 139.460779),
                        new LatLng(35.422303, 139.460105),
                        new LatLng(35.422674, 139.460006),
                        new LatLng(35.423008, 139.459824),
                        new LatLng(35.423849, 139.459369),
                        new LatLng(35.424109, 139.458535),
                        new LatLng(35.423565, 139.45817),
                        new LatLng(35.424041, 139.458011),
                        new LatLng(35.423627, 139.457361),
                        new LatLng(35.423592, 139.456685),
                        new LatLng(35.423706, 139.456245),
                        new LatLng(35.424186, 139.456127),
                        new LatLng(35.424606, 139.455848),
                        new LatLng(35.424641, 139.455559),
                        new LatLng(35.424947, 139.455065),
                        new LatLng(35.424676, 139.454561),
                        new LatLng(35.425052, 139.453874),
                        new LatLng(35.425358, 139.453563),
                        new LatLng(35.425953, 139.453091),
                        new LatLng(35.426477, 139.451857),
                        new LatLng(35.427054, 139.450506),
                        new LatLng(35.427229, 139.449916),
                        new LatLng(35.426591, 139.449916),
                        new LatLng(35.426101, 139.449905),
                        new LatLng(35.424877, 139.449454),
                        new LatLng(35.424248, 139.449873),
                        new LatLng(35.411717, 139.456623),
                        new LatLng(35.410874, 139.456376),
                        new LatLng(35.410393, 139.454852),
                        new LatLng(35.409204, 139.455072),
                        new LatLng(35.410239, 139.45453),
                        new LatLng(35.410865, 139.454799),
                        new LatLng(35.410974, 139.454473),
                        new LatLng(35.410925, 139.453923),
                        new LatLng(35.411243, 139.453821),
                        new LatLng(35.411317, 139.453777),
                        new LatLng(35.411181, 139.453683),
                        new LatLng(35.410639, 139.453279),
                        new LatLng(35.410795, 139.452399),
                        new LatLng(35.41064, 139.452095),
                        new LatLng(35.410965, 139.452069),
                        new LatLng(35.410371, 139.451338),
                        new LatLng(35.40915, 139.449524),
                        new LatLng(35.408419, 139.449384),
                        new LatLng(35.407411, 139.449112),
                        new LatLng(35.407558, 139.444717),
                        new LatLng(35.407624, 139.441444),
                        new LatLng(35.41287, 139.441873),
                        new LatLng(35.416932, 139.434959),
                        new LatLng(35.419471, 139.430348),
                        new LatLng(35.419941, 139.424665),
                        new LatLng(35.417775, 139.424906),
                        new LatLng(35.416004, 139.424251),
                        new LatLng(35.416665, 139.421996),
                        new LatLng(35.416778, 139.420851),
                        new LatLng(35.417381, 139.420459),
                        new LatLng(35.417635, 139.420228),
                        new LatLng(35.417493, 139.420207),
                        new LatLng(35.417458, 139.420351),
                        new LatLng(35.417034, 139.420081),
                        new LatLng(35.417676, 139.419496),
                        new LatLng(35.417831, 139.419263),
                        new LatLng(35.41782, 139.41923),
                        new LatLng(35.417603, 139.418702),
                        new LatLng(35.4186, 139.413221),
                        new LatLng(35.418714, 139.412853),
                        new LatLng(35.416267, 139.413649),
                        new LatLng(35.414204, 139.412013),
                        new LatLng(35.412545, 139.411139),
                        new LatLng(35.411863, 139.411547),
                        new LatLng(35.407746, 139.40726),
                        new LatLng(35.40523, 139.407027),
                        new LatLng(35.403321, 139.405982),
                        new LatLng(35.402009, 139.403525),
                        new LatLng(35.392267, 139.398536),
                        new LatLng(35.391093, 139.400306),
                        new LatLng(35.390043, 139.403889),
                        new LatLng(35.388505, 139.402918),
                        new LatLng(35.384522, 139.399945),
                        new LatLng(35.380044, 139.402069),
                        new LatLng(35.38533, 139.415522),
                        new LatLng(35.380682, 139.433494),
                        new LatLng(35.375853, 139.430632),
                        new LatLng(35.372949, 139.430276),
                        new LatLng(35.370473, 139.428474),
                        new LatLng(35.370267, 139.430495),
                        new LatLng(35.372695, 139.431794),
                        new LatLng(35.372739, 139.43239),
                        new LatLng(35.373916, 139.433238),
                        new LatLng(35.3709, 139.434248),
                        new LatLng(35.370385, 139.432985),
                        new LatLng(35.368325, 139.433472),
                        new LatLng(35.368104, 139.434555),
                        new LatLng(35.368634, 139.435403),
                        new LatLng(35.36962, 139.438849),
                        new LatLng(35.368531, 139.441755),
                        new LatLng(35.364617, 139.440058),
                        new LatLng(35.363513, 139.436937),
                        new LatLng(35.361453, 139.43672),
                        new LatLng(35.359687, 139.438272),
                        new LatLng(35.352977, 139.440564),
                        new LatLng(35.338825, 139.444198),
                        new LatLng(35.337621, 139.443801),
                        new LatLng(35.336043, 139.44379),
                        new LatLng(35.335309, 139.443806),
                        new LatLng(35.335285, 139.443866),
                        new LatLng(35.335058, 139.443807),
                        new LatLng(35.334201, 139.443184),
                        new LatLng(35.334221, 139.443051),
                        new LatLng(35.334142, 139.443004),
                        new LatLng(35.334004, 139.442887),
                        new LatLng(35.333846, 139.442706),
                        new LatLng(35.333964, 139.442517),
                        new LatLng(35.333772, 139.442388),
                        new LatLng(35.333625, 139.442352),
                        new LatLng(35.33357, 139.442564),
                        new LatLng(35.333454, 139.442544),
                        new LatLng(35.333447, 139.442458),
                        new LatLng(35.333062, 139.442321),
                        new LatLng(35.332981, 139.442578),
                        new LatLng(35.332839, 139.442546),
                        new LatLng(35.332811, 139.442472),
                        new LatLng(35.332384, 139.442639),
                        new LatLng(35.332325, 139.44314),
                        new LatLng(35.331803, 139.443149),
                        new LatLng(35.331313, 139.443491),
                        new LatLng(35.319528, 139.438696),
                        new LatLng(35.315146, 139.469635),
                        new LatLng(35.307843, 139.480192),
                        new LatLng(35.306192, 139.478747),
                        new LatLng(35.303911, 139.478124),
                        new LatLng(35.301525, 139.476975),
                        new LatLng(35.299089, 139.473827),
                        new LatLng(35.297454, 139.475102),
                        new LatLng(35.297479, 139.481262),
                        new LatLng(35.297628, 139.483598),
                        new LatLng(35.299163, 139.487877),
                        new LatLng(35.303741, 139.484577),//
                        new LatLng(35.305803, 139.485460),
                        new LatLng(35.306288, 139.486794),
                        new LatLng(35.307553, 139.4868),
                        new LatLng(35.307675, 139.4874),
                        new LatLng(35.307673, 139.488006),
                        new LatLng(35.307764, 139.488698),
                        new LatLng(35.308409, 139.488784),
                        new LatLng(35.308414, 139.488259),
                        new LatLng(35.309684, 139.489031),
                        new LatLng(35.31008, 139.489258),
                        new LatLng(35.310118, 139.489286),
                        new LatLng(35.310692, 139.489916),
                        new LatLng(35.311476, 139.490552),
                        new LatLng(35.31208, 139.489336),
                        new LatLng(35.312261, 139.48923),
                        new LatLng(35.312793, 139.489044),
                        new LatLng(35.313046, 139.489482),
                        new LatLng(35.313182, 139.489634),
                        new LatLng(35.313281, 139.489855),
                        new LatLng(35.313476, 139.489828),
                        new LatLng(35.313623, 139.490195),
                        new LatLng(35.313676, 139.490884),
                        new LatLng(35.313673, 139.491049),
                        new LatLng(35.313802, 139.491274),
                        new LatLng(35.31388, 139.491915),
                        new LatLng(35.314005, 139.492037),
                        new LatLng(35.314141, 139.49256),
                        new LatLng(35.314187, 139.492876),
                        new LatLng(35.314327, 139.493316),
                        new LatLng(35.315203, 139.493691),
                        new LatLng(35.315912, 139.494131),
                        new LatLng(35.31715, 139.494541),
                        new LatLng(35.317311, 139.495118),
                        new LatLng(35.318016, 139.49574),
                        new LatLng(35.317831, 139.496423),
                        new LatLng(35.318116, 139.496392),
                        new LatLng(35.318939, 139.496624),
                        new LatLng(35.32167, 139.49641),
                        new LatLng(35.325578, 139.498047),
                        new LatLng(35.325954, 139.498315),
                        new LatLng(35.326182, 139.498487),
                        new LatLng(35.326724, 139.498787),
                        new LatLng(35.327054, 139.498864),
                        new LatLng(35.327877, 139.500173),
                        new LatLng(35.328227, 139.500387),
                        new LatLng(35.328612, 139.500323),
                        new LatLng(35.329033, 139.500108),
                        new LatLng(35.329575, 139.500366),
                        new LatLng(35.330083, 139.500387),
                        new LatLng(35.330711, 139.498783),
                        new LatLng(35.331996, 139.498655),
                        new LatLng(35.336551, 139.510308),
                        new LatLng(35.340357, 139.512166),
                        new LatLng(35.341153, 139.51164),
                        new LatLng(35.341652, 139.511222),
                        new LatLng(35.342675, 139.510943),
                        new LatLng(35.34292, 139.510717),
                        new LatLng(35.343393, 139.509934),
                        new LatLng(35.343586, 139.50972),
                        new LatLng(35.343787, 139.509559),
                        new LatLng(35.343962, 139.509451),
                        new LatLng(35.344163, 139.509301),
                        new LatLng(35.344487, 139.508679),
                        new LatLng(35.344883, 139.508649),
                        new LatLng(35.345428, 139.508588),
                        new LatLng(35.34575, 139.508376)
                        // new LatLng(35.347086, 139.511319)
                        //new LatLng(35.288160, 139.455630)
                        // new LatLng(35.351298, 139.510267)
                );


        // 5000個分
       // rectOptions.add(new LatLng(35.453597, 140.460481));
        // specialstam
        //rectOptions = getPolygonOptionsInput(3000, rectOptions);


        rectOptions.fillColor(Color.YELLOW - ALPHA_ADJUSTMENT);
        rectOptions.strokeColor(Color.RED);
        rectOptions.strokeWidth(5);
        arPolygon.add(mMap.addPolygon(rectOptions));


        for (int i = 0; i < arPolygon.size(); ++i) {
            arPolygon.get(i).setFillColor(Color.BLUE - ALPHA_ADJUSTMENT);
        }


        //  mMap.addMarker(new MarkerOptions().position(moveCountry).title(arTestData.get(i).geTitleComment()));
//
//        Polygon polygon = mMap.addPolygon(new PolygonOptions()
//                .add(
//                        new LatLng(35.34857, 139.510148),
//                        new LatLng(35.347086, 139.511319),
//                        new LatLng(35.34575, 139.508376),
//                        new LatLng(35.345428, 139.508588)).strokeColor(Color.RED)
//                .fillColor(Color.BLUE));
//        //  }


    }

    public PolygonOptions getPolygonOptionsInput(int inputValue, PolygonOptions arPolyOption) {
        double moto = 139.508376;

        double distance;
        distance = (139.511319 - moto) / inputValue;
        //distance = (139.855376 - moto) / inputValue;
       // double addValue = Double.parseDouble(String.format("%.6f", distance))
        //distance = 0.060006;

        for (int i = 0; i < inputValue; ++i) {
            moto = moto + distance;
            arPolyOption.add(new LatLng(35.34575, moto));
        }
        return arPolyOption;
    }

    public void mapShow() {

        ArrayList<LatLng> arrayPoints = new ArrayList<LatLng>();

        arrayPoints.add(new LatLng(35.34857, 139.510148));
        arrayPoints.add(new LatLng(35.347086, 139.511319));
        arrayPoints.add(new LatLng(35.34575, 139.508376));
        arrayPoints.add(new LatLng(35.345428, 139.508588));
        arrayPoints.add(new LatLng(35.344883, 139.508649));
        arrayPoints.add(new LatLng(35.344487, 139.508679));
        arrayPoints.add(new LatLng(35.344163, 139.509301));
        arrayPoints.add(new LatLng(35.343962, 139.509451));
        arrayPoints.add(new LatLng(35.343787, 139.509559));
        arrayPoints.add(new LatLng(35.343586, 139.50972));
        arrayPoints.add(new LatLng(35.343393, 139.509934));
        arrayPoints.add(new LatLng(35.34292, 139.510717));
        arrayPoints.add(new LatLng(35.342675, 139.510943));
        arrayPoints.add(new LatLng(35.341652, 139.511222));
        arrayPoints.add(new LatLng(35.341153, 139.51164));
        arrayPoints.add(new LatLng(35.340357, 139.512166));
        arrayPoints.add(new LatLng(35.336551, 139.510308));
        arrayPoints.add(new LatLng(35.331996, 139.498655));
        arrayPoints.add(new LatLng(35.330711, 139.498783));
        arrayPoints.add(new LatLng(35.330083, 139.500387));
        arrayPoints.add(new LatLng(35.329575, 139.500366));
        arrayPoints.add(new LatLng(35.329033, 139.500108));
        arrayPoints.add(new LatLng(35.328612, 139.500323));
        arrayPoints.add(new LatLng(35.328227, 139.500387));
        arrayPoints.add(new LatLng(35.327877, 139.500173));
        arrayPoints.add(new LatLng(35.327054, 139.498864));
        arrayPoints.add(new LatLng(35.326724, 139.498787));
        arrayPoints.add(new LatLng(35.326182, 139.498487));
        arrayPoints.add(new LatLng(35.325954, 139.498315));
        arrayPoints.add(new LatLng(35.325578, 139.498047));
        arrayPoints.add(new LatLng(35.32167, 139.49641));
        arrayPoints.add(new LatLng(35.318939, 139.496624));
        arrayPoints.add(new LatLng(35.318116, 139.496392));
        arrayPoints.add(new LatLng(35.317831, 139.496423));
        arrayPoints.add(new LatLng(35.318016, 139.49574));
        arrayPoints.add(new LatLng(35.317311, 139.495118));
        arrayPoints.add(new LatLng(35.31715, 139.494541));
        arrayPoints.add(new LatLng(35.315912, 139.494131));
        arrayPoints.add(new LatLng(35.315203, 139.493691));
        arrayPoints.add(new LatLng(35.314327, 139.493316));
        arrayPoints.add(new LatLng(35.314187, 139.492876));
        arrayPoints.add(new LatLng(35.314141, 139.49256));
        arrayPoints.add(new LatLng(35.314005, 139.492037));
        arrayPoints.add(new LatLng(35.31388, 139.491915));
        arrayPoints.add(new LatLng(35.313802, 139.491274));
        arrayPoints.add(new LatLng(35.313673, 139.491049));
        arrayPoints.add(new LatLng(35.313676, 139.490884));
        arrayPoints.add(new LatLng(35.313623, 139.490195));
        arrayPoints.add(new LatLng(35.313476, 139.489828));
        arrayPoints.add(new LatLng(35.313281, 139.489855));
        arrayPoints.add(new LatLng(35.313182, 139.489634));
        arrayPoints.add(new LatLng(35.313046, 139.489482));
        arrayPoints.add(new LatLng(35.312793, 139.489044));
        arrayPoints.add(new LatLng(35.312261, 139.48923));
        arrayPoints.add(new LatLng(35.31208, 139.489336));
        arrayPoints.add(new LatLng(35.311476, 139.490552));
        arrayPoints.add(new LatLng(35.310692, 139.489916));
        arrayPoints.add(new LatLng(35.310118, 139.489286));
        arrayPoints.add(new LatLng(35.31008, 139.489258));
        arrayPoints.add(new LatLng(35.309684, 139.489031));
        arrayPoints.add(new LatLng(35.308414, 139.488259));
        arrayPoints.add(new LatLng(35.308409, 139.488784));
        arrayPoints.add(new LatLng(35.307764, 139.488698));
        arrayPoints.add(new LatLng(35.307673, 139.488006));
        arrayPoints.add(new LatLng(35.307675, 139.4874));
        arrayPoints.add(new LatLng(35.307553, 139.4868));
        arrayPoints.add(new LatLng(35.307129, 139.485743));
        arrayPoints.add(new LatLng(35.30618, 139.484055));
        arrayPoints.add(new LatLng(35.303398, 139.481565));
        arrayPoints.add(new LatLng(35.299163, 139.487877));
        arrayPoints.add(new LatLng(35.297628, 139.483598));
        arrayPoints.add(new LatLng(35.297479, 139.481262));
        arrayPoints.add(new LatLng(35.297454, 139.475102));
        arrayPoints.add(new LatLng(35.299089, 139.473827));
        arrayPoints.add(new LatLng(35.300439, 139.476771));
        arrayPoints.add(new LatLng(35.302878, 139.481064));
        arrayPoints.add(new LatLng(35.305354, 139.481793));
        arrayPoints.add(new LatLng(35.307843, 139.480192));
        arrayPoints.add(new LatLng(35.315146, 139.469635));
        arrayPoints.add(new LatLng(35.319528, 139.438696));
        arrayPoints.add(new LatLng(35.331313, 139.443491));
        arrayPoints.add(new LatLng(35.331803, 139.443149));
        arrayPoints.add(new LatLng(35.332325, 139.44314));
        arrayPoints.add(new LatLng(35.332384, 139.442639));
        arrayPoints.add(new LatLng(35.332811, 139.442472));
        arrayPoints.add(new LatLng(35.332839, 139.442546));
        arrayPoints.add(new LatLng(35.332981, 139.442578));
        arrayPoints.add(new LatLng(35.333062, 139.442321));
        arrayPoints.add(new LatLng(35.333447, 139.442458));
        arrayPoints.add(new LatLng(35.333454, 139.442544));
        arrayPoints.add(new LatLng(35.33357, 139.442564));
        arrayPoints.add(new LatLng(35.333625, 139.442352));
        arrayPoints.add(new LatLng(35.333772, 139.442388));
        arrayPoints.add(new LatLng(35.333964, 139.442517));
        arrayPoints.add(new LatLng(35.333846, 139.442706));
        arrayPoints.add(new LatLng(35.334004, 139.442887));
        arrayPoints.add(new LatLng(35.334142, 139.443004));
        arrayPoints.add(new LatLng(35.334221, 139.443051));
        arrayPoints.add(new LatLng(35.334201, 139.443184));
        arrayPoints.add(new LatLng(35.335058, 139.443807));
        arrayPoints.add(new LatLng(35.335285, 139.443866));
        arrayPoints.add(new LatLng(35.335309, 139.443806));
        arrayPoints.add(new LatLng(35.336043, 139.44379));
        arrayPoints.add(new LatLng(35.337621, 139.443801));
        arrayPoints.add(new LatLng(35.338825, 139.444198));
        arrayPoints.add(new LatLng(35.352977, 139.440564));
        arrayPoints.add(new LatLng(35.359687, 139.438272));
        arrayPoints.add(new LatLng(35.361453, 139.43672));
        arrayPoints.add(new LatLng(35.363513, 139.436937));
        arrayPoints.add(new LatLng(35.364617, 139.440058));
        arrayPoints.add(new LatLng(35.368531, 139.441755));
        arrayPoints.add(new LatLng(35.36962, 139.438849));
        arrayPoints.add(new LatLng(35.368634, 139.435403));
        arrayPoints.add(new LatLng(35.368104, 139.434555));
        arrayPoints.add(new LatLng(35.368325, 139.433472));
        arrayPoints.add(new LatLng(35.370385, 139.432985));
        arrayPoints.add(new LatLng(35.3709, 139.434248));
        arrayPoints.add(new LatLng(35.373916, 139.433238));
        arrayPoints.add(new LatLng(35.372739, 139.43239));
        arrayPoints.add(new LatLng(35.372695, 139.431794));
        arrayPoints.add(new LatLng(35.370267, 139.430495));
        arrayPoints.add(new LatLng(35.370473, 139.428474));
        arrayPoints.add(new LatLng(35.372949, 139.430276));
        arrayPoints.add(new LatLng(35.375853, 139.430632));
        arrayPoints.add(new LatLng(35.380682, 139.433494));
        arrayPoints.add(new LatLng(35.38533, 139.415522));
        arrayPoints.add(new LatLng(35.380044, 139.402069));
        arrayPoints.add(new LatLng(35.384522, 139.399945));
        arrayPoints.add(new LatLng(35.388505, 139.402918));
        arrayPoints.add(new LatLng(35.390043, 139.403889));
        arrayPoints.add(new LatLng(35.391093, 139.400306));
        arrayPoints.add(new LatLng(35.392267, 139.398536));
        arrayPoints.add(new LatLng(35.402009, 139.403525));
        arrayPoints.add(new LatLng(35.403321, 139.405982));
        arrayPoints.add(new LatLng(35.40523, 139.407027));
        arrayPoints.add(new LatLng(35.407746, 139.40726));
        arrayPoints.add(new LatLng(35.411863, 139.411547));
        arrayPoints.add(new LatLng(35.412545, 139.411139));
        arrayPoints.add(new LatLng(35.414204, 139.412013));
        arrayPoints.add(new LatLng(35.416267, 139.413649));
        arrayPoints.add(new LatLng(35.418714, 139.412853));
        arrayPoints.add(new LatLng(35.4186, 139.413221));
        arrayPoints.add(new LatLng(35.417603, 139.418702));
        arrayPoints.add(new LatLng(35.41782, 139.41923));
        arrayPoints.add(new LatLng(35.417831, 139.419263));
        arrayPoints.add(new LatLng(35.417676, 139.419496));
        arrayPoints.add(new LatLng(35.417034, 139.420081));
        arrayPoints.add(new LatLng(35.417458, 139.420351));
        arrayPoints.add(new LatLng(35.417493, 139.420207));
        arrayPoints.add(new LatLng(35.417635, 139.420228));
        arrayPoints.add(new LatLng(35.417381, 139.420459));
        arrayPoints.add(new LatLng(35.416778, 139.420851));
        arrayPoints.add(new LatLng(35.416665, 139.421996));
        arrayPoints.add(new LatLng(35.416004, 139.424251));
        arrayPoints.add(new LatLng(35.417775, 139.424906));
        arrayPoints.add(new LatLng(35.419941, 139.424665));
        arrayPoints.add(new LatLng(35.419471, 139.430348));
        arrayPoints.add(new LatLng(35.416932, 139.434959));
        arrayPoints.add(new LatLng(35.41287, 139.441873));
        arrayPoints.add(new LatLng(35.407624, 139.441444));
        arrayPoints.add(new LatLng(35.407558, 139.444717));
        arrayPoints.add(new LatLng(35.407411, 139.449112));
        arrayPoints.add(new LatLng(35.408419, 139.449384));
        arrayPoints.add(new LatLng(35.40915, 139.449524));
        arrayPoints.add(new LatLng(35.410371, 139.451338));
        arrayPoints.add(new LatLng(35.410965, 139.452069));
        arrayPoints.add(new LatLng(35.41064, 139.452095));
        arrayPoints.add(new LatLng(35.410795, 139.452399));
        arrayPoints.add(new LatLng(35.410639, 139.453279));
        arrayPoints.add(new LatLng(35.411181, 139.453683));
        arrayPoints.add(new LatLng(35.411317, 139.453777));
        arrayPoints.add(new LatLng(35.411243, 139.453821));
        arrayPoints.add(new LatLng(35.410925, 139.453923));
        arrayPoints.add(new LatLng(35.410974, 139.454473));
        arrayPoints.add(new LatLng(35.410865, 139.454799));
        arrayPoints.add(new LatLng(35.410239, 139.45453));
        arrayPoints.add(new LatLng(35.409204, 139.455072));
        arrayPoints.add(new LatLng(35.410393, 139.454852));
        arrayPoints.add(new LatLng(35.410874, 139.456376));
        arrayPoints.add(new LatLng(35.411717, 139.456623));
        arrayPoints.add(new LatLng(35.424248, 139.449873));
        arrayPoints.add(new LatLng(35.424877, 139.449454));
        arrayPoints.add(new LatLng(35.426101, 139.449905));
        arrayPoints.add(new LatLng(35.426591, 139.449916));
        arrayPoints.add(new LatLng(35.427229, 139.449916));
        arrayPoints.add(new LatLng(35.427054, 139.450506));
        arrayPoints.add(new LatLng(35.426477, 139.451857));
        arrayPoints.add(new LatLng(35.425953, 139.453091));
        arrayPoints.add(new LatLng(35.425358, 139.453563));
        arrayPoints.add(new LatLng(35.425052, 139.453874));
        arrayPoints.add(new LatLng(35.424676, 139.454561));
        arrayPoints.add(new LatLng(35.424947, 139.455065));
        arrayPoints.add(new LatLng(35.424641, 139.455559));
        arrayPoints.add(new LatLng(35.424606, 139.455848));
        arrayPoints.add(new LatLng(35.424186, 139.456127));
        arrayPoints.add(new LatLng(35.423706, 139.456245));
        arrayPoints.add(new LatLng(35.423592, 139.456685));
        arrayPoints.add(new LatLng(35.423627, 139.457361));
        arrayPoints.add(new LatLng(35.424041, 139.458011));
        arrayPoints.add(new LatLng(35.423565, 139.45817));
        arrayPoints.add(new LatLng(35.424109, 139.458535));
        arrayPoints.add(new LatLng(35.423849, 139.459369));
        arrayPoints.add(new LatLng(35.423008, 139.459824));
        arrayPoints.add(new LatLng(35.422674, 139.460006));
        arrayPoints.add(new LatLng(35.422303, 139.460105));
        arrayPoints.add(new LatLng(35.422244, 139.460779));
        arrayPoints.add(new LatLng(35.422821, 139.461884));
        arrayPoints.add(new LatLng(35.42317, 139.462378));
        arrayPoints.add(new LatLng(35.423433, 139.463451));
        arrayPoints.add(new LatLng(35.42345, 139.464824));
        arrayPoints.add(new LatLng(35.423651, 139.466929));
        arrayPoints.add(new LatLng(35.423563, 139.470923));
        arrayPoints.add(new LatLng(35.422348, 139.473144));
        arrayPoints.add(new LatLng(35.421998, 139.474163));
        arrayPoints.add(new LatLng(35.420835, 139.475987));
        arrayPoints.add(new LatLng(35.419559, 139.477854));
        arrayPoints.add(new LatLng(35.417124, 139.477495));
        arrayPoints.add(new LatLng(35.416101, 139.477114));
        arrayPoints.add(new LatLng(35.414438, 139.475829));
        arrayPoints.add(new LatLng(35.412694, 139.476118));
        arrayPoints.add(new LatLng(35.408292, 139.475543));
        arrayPoints.add(new LatLng(35.40374, 139.475336));
        arrayPoints.add(new LatLng(35.402, 139.47474));
        arrayPoints.add(new LatLng(35.398963, 139.477167));
        arrayPoints.add(new LatLng(35.396545, 139.477008));
        arrayPoints.add(new LatLng(35.395203, 139.47722));
        arrayPoints.add(new LatLng(35.393744, 139.478039));
        arrayPoints.add(new LatLng(35.391252, 139.479562));
        arrayPoints.add(new LatLng(35.389147, 139.481184));
        arrayPoints.add(new LatLng(35.388346, 139.483136));
        arrayPoints.add(new LatLng(35.389372, 139.481057));
        arrayPoints.add(new LatLng(35.387854, 139.483532));
        arrayPoints.add(new LatLng(35.386473, 139.484445));
        arrayPoints.add(new LatLng(35.383823, 139.484922));
        arrayPoints.add(new LatLng(35.381417, 139.487244));
        arrayPoints.add(new LatLng(35.378042, 139.492439));
        arrayPoints.add(new LatLng(35.373658, 139.489967));
        arrayPoints.add(new LatLng(35.371068, 139.488379));
        arrayPoints.add(new LatLng(35.365698, 139.48818));
        arrayPoints.add(new LatLng(35.360413, 139.485578));
        arrayPoints.add(new LatLng(35.359556, 139.485455));
        arrayPoints.add(new LatLng(35.358391, 139.489142));
        arrayPoints.add(new LatLng(35.358807, 139.489308));
        arrayPoints.add(new LatLng(35.358422, 139.491005));
        arrayPoints.add(new LatLng(35.358496, 139.492615));
        arrayPoints.add(new LatLng(35.357122, 139.495479));
        arrayPoints.add(new LatLng(35.355731, 139.502517));
        arrayPoints.add(new LatLng(35.3532, 139.50496));
        arrayPoints.add(new LatLng(35.350889, 139.503523));
        arrayPoints.add(new LatLng(35.351885, 139.505536));
        arrayPoints.add(new LatLng(35.352115, 139.505798));
        arrayPoints.add(new LatLng(35.352026, 139.506189));
        arrayPoints.add(new LatLng(35.351886, 139.506147));
        arrayPoints.add(new LatLng(35.351639, 139.506693));
        arrayPoints.add(new LatLng(35.351809, 139.506809));
        arrayPoints.add(new LatLng(35.351991, 139.506904));
        arrayPoints.add(new LatLng(35.351888, 139.507105));
        arrayPoints.add(new LatLng(35.351796, 139.507332));
        arrayPoints.add(new LatLng(35.351741, 139.507325));
        arrayPoints.add(new LatLng(35.351326, 139.507036));
        arrayPoints.add(new LatLng(35.351134, 139.507257));
        arrayPoints.add(new LatLng(35.351077, 139.507276));
        arrayPoints.add(new LatLng(35.350979, 139.507121));
        arrayPoints.add(new LatLng(35.350853, 139.5072));
        arrayPoints.add(new LatLng(35.351054, 139.507705));
        arrayPoints.add(new LatLng(35.351185, 139.507883));
        arrayPoints.add(new LatLng(35.351348, 139.508067));
        arrayPoints.add(new LatLng(35.351709, 139.508388));
        arrayPoints.add(new LatLng(35.351903, 139.508392));
        arrayPoints.add(new LatLng(35.352003, 139.508549));
        arrayPoints.add(new LatLng(35.351935, 139.508792));
        arrayPoints.add(new LatLng(35.351723, 139.50883));
        arrayPoints.add(new LatLng(35.351417, 139.508768));
        arrayPoints.add(new LatLng(35.351335, 139.508914));
        arrayPoints.add(new LatLng(35.351067, 139.508842));
        arrayPoints.add(new LatLng(35.351052, 139.508636));
        arrayPoints.add(new LatLng(35.351104, 139.508559));
        arrayPoints.add(new LatLng(35.351056, 139.50844));
        arrayPoints.add(new LatLng(35.350966, 139.508445));
        arrayPoints.add(new LatLng(35.350732, 139.508697));
        arrayPoints.add(new LatLng(35.350645, 139.508939));
        arrayPoints.add(new LatLng(35.350266, 139.508848));
        arrayPoints.add(new LatLng(35.349907, 139.508767));
        arrayPoints.add(new LatLng(35.349798, 139.508781));
        arrayPoints.add(new LatLng(35.349662, 139.508729));
        arrayPoints.add(new LatLng(35.349572, 139.508946));
        arrayPoints.add(new LatLng(35.349211, 139.509424));
        arrayPoints.add(new LatLng(35.348807, 139.509464));
        arrayPoints.add(new LatLng(35.349625, 139.508807));
        arrayPoints.add(new LatLng(35.349487, 139.509011));
        arrayPoints.add(new LatLng(35.349384, 139.509171));
        arrayPoints.add(new LatLng(35.349294, 139.509273));
        arrayPoints.add(new LatLng(35.349172, 139.509461));
        arrayPoints.add(new LatLng(35.348971, 139.509432));
        arrayPoints.add(new LatLng(35.348911, 139.509904));
        arrayPoints.add(new LatLng(35.348893, 139.510013));
        arrayPoints.add(new LatLng(35.34888, 139.510083));
        arrayPoints.add(new LatLng(35.348854, 139.510203));
        arrayPoints.add(new LatLng(35.348825, 139.51027));
        arrayPoints.add(new LatLng(35.348797, 139.510302));
        arrayPoints.add(new LatLng(35.34857, 139.510148));


        PolylineOptions polylineOptions;

        // 맵셋팅
        polylineOptions = new PolylineOptions();
        polylineOptions.color(Color.RED);
        polylineOptions.width(5);
        //polylineOptions.fillColor(Color.YELLOW - ALPHA_ADJUSTMENT);
        polylineOptions.addAll(arrayPoints);
        mMap.addPolyline(polylineOptions);


    }

    public void setFadeIn(View v) {
        if (mMoonTiles == null) {
            return;
        }
        mMoonTiles.setFadeIn(((CheckBox) v).isChecked());
    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {
    }

    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
        if (mMoonTiles != null) {
            mMoonTiles.setTransparency((float) progress / (float) TRANSPARENCY_MAX);
            // progress

            if (progress >= 0 && progress <= 20) {
                mMap.animateCamera(CameraUpdateFactory.zoomTo(0), 10, null);
            } else if (progress > 20 && progress <= 40) {
                mMap.animateCamera(CameraUpdateFactory.zoomTo(3), 10, null);
            } else if (progress > 40 && progress <= 60) {
                mMap.animateCamera(CameraUpdateFactory.zoomTo(5), 10, null);
            } else if (progress > 60 && progress <= 80) {
                mMap.animateCamera(CameraUpdateFactory.zoomTo(7), 10, null);
            } else if (progress > 80 && progress <= 100) {
                mMap.animateCamera(CameraUpdateFactory.zoomTo(9), 10, null);
            }
//            if (progress >= 0 && progress <= 10) {
//                mMap.animateCamera(CameraUpdateFactory.zoomTo(1), 10, null);
//                if (progress > 10 && progress <= 20) {
//                    mMap.animateCamera(CameraUpdateFactory.zoomTo(2), 10, null);
//                } else if (progress > 20 && progress <= 30) {
//                    mMap.animateCamera(CameraUpdateFactory.zoomTo(3), 10, null);
//                } else if (progress > 30 && progress <= 40) {
//                    mMap.animateCamera(CameraUpdateFactory.zoomTo(5), 10, null);
//                } else if (progress > 40 && progress <= 50) {
//                    mMap.animateCamera(CameraUpdateFactory.zoomTo(6), 10, null);
//                } else if (progress > 50 && progress <= 60) {
//                    mMap.animateCamera(CameraUpdateFactory.zoomTo(7), 10, null);
//                } else if (progress > 60 && progress <= 70) {
//                    mMap.animateCamera(CameraUpdateFactory.zoomTo(9), 10, null);
//                } else if (progress > 70 && progress <= 80) {
//                    mMap.animateCamera(CameraUpdateFactory.zoomTo(11), 10, null);
//                } else if (progress > 80 && progress <= 90) {
//                    mMap.animateCamera(CameraUpdateFactory.zoomTo(13), 10, null);
//                } else if (progress > 90 && progress <= 100) {
//                    mMap.animateCamera(CameraUpdateFactory.zoomTo(15), 10, null);
//                }
            //gmap.moveCamera(CameraUpdateFactory.newLatLngZoom(startingPoint,16));

            i("seekbar", mMoonTiles + "" + "intProgress::" + progress);

        }
    }

    private void initData() {
        mMap.clear();
        iDangerBtnClickCount = 0;
        arLatLngArea = new ArrayList<LatLng>();
        arPolygon = new ArrayList<Polygon>();
    }

    private void setAlertMap() {
        // 初期化
        this.initData();

        ArrayList<LatLng> arrayPoints = new ArrayList<LatLng>();
        ;

        UiSettings uiSettings = mMap.getUiSettings(); // 구글맵 UI환경을 가져옴
        uiSettings.setZoomControlsEnabled(true);   // 줌 기능을 설정

        Double halfHeight = 0.009;
        Double halfWidth = 0.009;
        boolean bCheckPos = false;
        for (int i = 0; i < arTestData.size(); ++i) {

            LatLng moveCountry = new LatLng(arTestData.get(i).getYpos(), arTestData.get(i).getXpos());
            arLatLngArea.add(moveCountry);
            //  mMap.addMarker(new MarkerOptions().position(moveCountry).title(arTestData.get(i).geTitleComment()));
            if (!bCheckPos) {
                mMap.moveCamera(CameraUpdateFactory.newLatLng(moveCountry));
                bCheckPos = true;
            }

            arrayPoints.add(new LatLng(arTestData.get(i).getYpos(), arTestData.get(i).getXpos()));

            // Instantiates a new Polygon object and adds points to define a rectangle
//            PolygonOptions rectOptions = new PolygonOptions()
//                    .add(
////                            new LatLng(arTestData.get(i).getYpos() - halfHeight, arTestData.get(i).getXpos() + halfWidth),
////                            new LatLng(arTestData.get(i).getYpos() + halfHeight, arTestData.get(i).getXpos() + halfWidth),
////                            new LatLng(arTestData.get(i).getYpos() + halfHeight, arTestData.get(i).getXpos() - halfWidth),
////                            new LatLng(arTestData.get(i).getYpos() - halfHeight, arTestData.get(i).getXpos() - halfWidth)
//                            new LatLng(arTestData.get(i).getYpos(), arTestData.get(i).getXpos())
//                    );
//
//            rectOptions.fillColor(Color.YELLOW - ALPHA_ADJUSTMENT);
//            rectOptions.strokeColor(Color.RED);
//            rectOptions.strokeWidth(5);
//            arPolygon.add(mMap.addPolygon(rectOptions));


            PolylineOptions polylineOptions;

            // 맵셋팅
            polylineOptions = new PolylineOptions();
            polylineOptions.color(Color.RED);
            polylineOptions.width(5);
            polylineOptions.addAll(arrayPoints);
            mMap.addPolyline(polylineOptions);


        }
    }


    //   spinner設置
    private void setSpinner() {

        posNameSpinner = (Spinner) findViewById(spinner);

        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.heatmaps_datasets_array, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        posNameSpinner.setAdapter(adapter);
        posNameSpinner.setOnItemSelectedListener(new SpinnerActivity());
        posNameSpinner.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {


            }
        });


    }

    // Dealing with spinner choices
    public class SpinnerActivity implements AdapterView.OnItemSelectedListener {
        public void onItemSelected(AdapterView<?> parent, View view,
                                   int pos, long id) {
            String str = (String) posNameSpinner.getSelectedItem();

            //　もう一回データ取得
            getCsvPosData();
            setAlertMap();
            i("select spinner::::+", str);
            if (pos == 0) {
                i("i pos ", pos + "");
            } else if (pos == 1) {
                i("i pos ", pos + "");
            }

        }

        public void onNothingSelected(AdapterView<?> parent) {
            // Another interface callback
        }
    }

    // csvと spinerと連携
    public void dataReadBtn(View view) {
        i("dataRead", "click");
        //getCsvPosData();
        //setAlertMap();
        //mapShow();
        mapPoliGonShow();
    }

    // csvと spinerと連携
    public void changeStyle(View view) {
//        Log.i("changeStyle", "click");
//        if (arPolygon != null) {
//            for (int i = 0; i < arPolygon.size(); ++i) {
//                arPolygon.get(i).setFillColor(Color.RED - ALPHA_ADJUSTMENT);
//            }
//        }
//        mMap.setBuildingsEnabled(true)
        mMap.clear();
        this.mapPoliGonShow();

    }


    public void dangerousAreaClick(View view) {
      //  i("======iDangerBtnClickCount::", iDangerBtnClickCount + "");

        mMap.moveCamera(CameraUpdateFactory.newLatLng(arLatLngArea.get(iDangerBtnClickCount)));
        mMap.animateCamera(CameraUpdateFactory.zoomTo(12), 800, null);
        if (iDangerBtnClickCount < arLatLngArea.size() - 1) {
            iDangerBtnClickCount++;
        } else {
            iDangerBtnClickCount = 0;
        }

    }

    public void changeSheter(View view) {
        i("======changeSheter::", "click");
//        TileOverlay tileOverlay = mMap.addTileOverlay(new TileOverlayOptions()
//                .tileProvider(tileProvider));
        mMap.clear();

        this.mapPoliGonSmallShow();

    }

    public void marClearBtn(View view) {
        mMap.clear();
    }


    // csvからデータ取得
    private void getCsvPosData() {
        arTestData = new ArrayList<>();
        InputStream is = this.getResources().openRawResource
                (R.raw.pos_data_huzisawa);

        String line = "";
        BufferedReader reader = new BufferedReader(new InputStreamReader
                (is));
        String spnnerSelectedName = (String) posNameSpinner.getSelectedItem();

        try {
            while ((line = reader.readLine()) != null) {
                // do something with "line"
                String[] arSplitString = line.split(","); // ,単位で分離

                if (spnnerSelectedName.equals("total")) {
                    arTestData.add(new TestData(
                            arSplitString[0],   // posName
                            arSplitString[1],   // title
                            arSplitString[2],   // Y
                            arSplitString[3])); // X

                } else if (spnnerSelectedName.equals(arSplitString[0])) {
                    arTestData.add(new TestData(
                            arSplitString[0],   // posName
                            arSplitString[1],   // title
                            arSplitString[2],   // Y
                            arSplitString[3])); // X
                }

            }
        } catch (IOException ex) {
            // handle exception
        } finally {
            try {
                is.close();
            } catch (IOException e) {
                // handle exception
            }
        }

    //    i("=====================testData=========", arTestData.size() + "");
    }
}
