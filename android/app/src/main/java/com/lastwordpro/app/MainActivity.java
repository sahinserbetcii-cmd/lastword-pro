package com.lastwordpro.app;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

import androidx.core.content.ContextCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();
        int navy = ContextCompat.getColor(this, R.color.lw_navy);

        // Arka planı opak yap (beyaz flash ve beyaz boşluk hissini keser)
        window.getDecorView().setBackgroundColor(navy);

        // Translucent bayraklarını temizle (bunlar beyaz/şeffaf karışıklığı yaratıyor)
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);

        // System bar'lar opak çalışsın
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);

        // Renkleri bas
        window.setStatusBarColor(navy);
        window.setNavigationBarColor(navy);
    }
}
