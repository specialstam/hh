package where.nativegooglemap;


import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

/**
 * Created by ep-146 on 2017/01/10.
 */

public class ShoppingMallActivity extends Activity {
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


        webview.loadUrl("file:///android_asset/index.html");
    }
}
