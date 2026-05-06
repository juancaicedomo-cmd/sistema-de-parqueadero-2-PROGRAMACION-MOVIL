package com.parqueadero;

import android.content.Context;
import android.util.Log;

import io.socket.client.IO;
import io.socket.client.Socket;

import java.net.URI;

public class SocketManager {

    private static final String TAG = "SocketManager";

    private static String serverUrl;
    private static Socket socket;

    public static void init(Context context) {
        if (serverUrl == null) {
            serverUrl = context.getApplicationContext().getString(R.string.socket_server_url);
        }
    }

    public static synchronized Socket getSocket() {
        if (serverUrl == null) {
            throw new IllegalStateException("Llama SocketManager.init(context) antes de getSocket()");
        }
        if (socket == null) {
            try {
                socket = IO.socket(URI.create(serverUrl));
            } catch (IllegalArgumentException e) {
                Log.e(TAG, "URL del servidor inválida: " + serverUrl, e);
            }
        }
        return socket;
    }
}
