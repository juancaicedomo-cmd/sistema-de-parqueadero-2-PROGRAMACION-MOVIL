// En tu actividad de registro de vehículo
private void enviarNotificacion(String mensaje) {
    Socket socket = SocketSingleton.getSocket(); // Objeto singleton de Socket.IO
    try {
        JSONObject data = new JSONObject();
        data.put("mensaje", mensaje);
        socket.emit("notificacion", data);
    } catch (JSONException e) {
        e.printStackTrace();
    }
}

// Llamar al registrar ingreso o salida
btnRegistrar.setOnClickListener(v -> {
    registrarVehiculo();
    enviarNotificacion("Vehículo ingresó: " + etPlaca.getText().toString());
});