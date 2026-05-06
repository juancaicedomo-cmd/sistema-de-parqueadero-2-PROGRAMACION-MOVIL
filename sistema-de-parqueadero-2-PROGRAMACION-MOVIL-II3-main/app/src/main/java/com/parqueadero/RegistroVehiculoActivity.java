package com.parqueadero;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessaging;

import org.json.JSONException;
import org.json.JSONObject;

import io.socket.client.Socket;

public class RegistroVehiculoActivity extends AppCompatActivity {

    private static final int REQ_POST_NOTIFICATIONS = 1001;

    private static final String TAG = "RegistroVehiculo";
    private static final String EVENTO_NOTIFICACION = "notificacion";
    private static final String CAMPO_MENSAJE = "mensaje";

    private EditText etPlaca;
    private Button btnRegistrar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registro_vehiculo);

        // 🔥 1. OBTENER TOKEN FIREBASE
        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(task -> {
                    if (!task.isSuccessful()) {
                        Log.w("TOKEN", "Error", task.getException());
                        return;
                    }

                    String token = task.getResult();
                    Log.d("TOKEN", token);
                });

        // 🔥 2. CREAR CANAL DE NOTIFICACIÓN
        crearCanalNotificacion();

        SocketManager.init(this);
        pedirPermisoNotificacionesSiApi33();
        enlazarVistas();
        configurarBotonRegistrar();
    }

    private void crearCanalNotificacion() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    "canal1",
                    "Notificaciones",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
    }

    private void pedirPermisoNotificacionesSiApi33() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.POST_NOTIFICATIONS}, REQ_POST_NOTIFICATIONS);
            }
        }
    }

    private void enlazarVistas() {
        etPlaca = findViewById(R.id.etPlaca);
        btnRegistrar = findViewById(R.id.btnRegistrar);
    }

    private void configurarBotonRegistrar() {
        btnRegistrar.setOnClickListener(v -> {
            String placa = etPlaca.getText().toString().trim();
            if (placa.isEmpty()) {
                Toast.makeText(this, R.string.error_placa_vacia, Toast.LENGTH_SHORT).show();
                return;
            }
            mostrarRegistroExitoso();

            // 🔥 NOTIFICACIÓN LOCAL (PRUEBA)
            mostrarNotificacionLocal("Vehículo registrado", placa);

            enviarNotificacion(getString(R.string.msg_vehiculo_ingreso, placa));
            Toast.makeText(this, R.string.msg_notificacion_enviada, Toast.LENGTH_SHORT).show();
        });
    }

    private void mostrarRegistroExitoso() {
        Toast.makeText(this, R.string.msg_vehiculo_registrado, Toast.LENGTH_SHORT).show();
    }

    private void mostrarNotificacionLocal(String titulo, String mensaje) {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "canal1")
                .setContentTitle(titulo)
                .setContentText(mensaje)
                .setSmallIcon(android.R.drawable.ic_dialog_info);

        NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        manager.notify(1, builder.build());
    }

    private void enviarNotificacion(String mensaje) {
        Socket socket = SocketManager.getSocket();
        if (socket == null) {
            Toast.makeText(this, R.string.error_socket, Toast.LENGTH_SHORT).show();
            return;
        }
        if (!socket.connected()) {
            socket.connect();
        }
        try {
            JSONObject json = new JSONObject();
            json.put(CAMPO_MENSAJE, mensaje);
            socket.emit(EVENTO_NOTIFICACION, json);
        } catch (JSONException e) {
            Log.e(TAG, "Error al armar el mensaje", e);
            Toast.makeText(this, R.string.error_enviar_notificacion, Toast.LENGTH_SHORT).show();
        }
    }
}