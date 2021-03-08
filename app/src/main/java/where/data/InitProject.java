package where.data;

import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.StrictMode;

public class InitProject {

    //Constructor
    public InitProject() {

    }


     // Manifestで許可を一括でチェックする。
    public void checkPermissions(Activity activity) {
        if (android.os.Build.VERSION.SDK_INT > 9) {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (activity.checkSelfPermission(android.Manifest.permission.INTERNET) != PackageManager.PERMISSION_GRANTED
                    || activity.checkSelfPermission(android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                    || activity.checkSelfPermission(android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                activity.requestPermissions(new String[]{
                        android.Manifest.permission.INTERNET, android.Manifest.permission.ACCESS_FINE_LOCATION,
                        android.Manifest.permission.ACCESS_FINE_LOCATION,
                        android.Manifest.permission.ACCESS_COARSE_LOCATION
                }, 1);
            }
        } else {

        }
    }


}