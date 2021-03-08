package where.nativegooglemap;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import where.data.InitProject;

public class MainActivity extends AppCompatActivity {
    private InitProject initProject;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

       initProject = new InitProject();
       initProject.checkPermissions(this);

        findViewById(R.id.btnWebViewLeaflet).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, WebviewActivity.class);
                startActivity(intent);
                //Log.i("webView","表示");
            }
        });

        findViewById(R.id.btnFragment).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, MapsActivity.class);
                startActivity(intent);
            }
        });



        findViewById(R.id.btnXmlParser).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, RouteDetailActivity.class);
                startActivity(intent);
            }
        });

        findViewById(R.id.btnShoppingMall).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, ShoppingMallActivity.class);
                startActivity(intent);
            }
        });




    }
}
