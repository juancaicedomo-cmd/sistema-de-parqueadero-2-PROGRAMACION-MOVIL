import io.socket.client.IO;
import io.socket.client.Socket;
import java.net.URISyntaxException;

public class SocketManager {

    private static Socket socket;

    public static Socket getSocket() {
        if (socket == null) {
            try {
                socket = IO.socket("https://TU_URL_NGROK");
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
        }
        return socket;
    }
}