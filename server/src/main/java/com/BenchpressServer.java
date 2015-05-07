package com;

import java.util.*;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;

public class BenchpressServer {
    private static final int defaultHeight = 200;
    private static Timer timer = null;

    private static int targetHeight = defaultHeight;
    private static int actualHeight = defaultHeight;

    public static void main(String[] args) throws InterruptedException {

        Configuration config = new Configuration();
        config.setHostname("gs14445.sp.cs.cmu.edu");
        config.setPort(3001);

        final SocketIOServer server = new SocketIOServer(config);

        final Random r = new Random();

        server.addConnectListener(new ConnectListener() {
            @Override
            public void onConnect(SocketIOClient client) {
                System.out.println("Connected to client" +
                        client.getSessionId().toString() + "\n");
            }
        });

        // Sets up the db backend and lets client know when ready
        server.addEventListener("setup", DBConfig.class, new DataListener<DBConfig>() {
            @Override
            public void onData(SocketIOClient client, DBConfig data,
                    AckRequest ackRequest) {
                //server.getBroadcastOperations().sendEvent("chatevent", data);
                System.out.println("Received game configuration from client:\n"
                        + data.toString() + "\n");
                // TODO: Set up oltpbench
                try {
                    Thread.sleep(3000);     // Fake setup delay (3 sec)
                } catch(InterruptedException e) {
                    e.printStackTrace();
                }

                // Setup fake throughput timer to send update every 10ms
		final TimerTask task = new TimerTask() {
		    @Override
		    public void run() {
			int diff = targetHeight - actualHeight;
			actualHeight += diff * r.nextDouble();
                        server.getBroadcastOperations().sendEvent("height", Integer.valueOf(actualHeight).toString());
		    }
		};
		timer = new Timer();
                timer.schedule(task, 0, 10);

                // Send 'ready' response to client
                System.out.println("Backend ready... sending ready response to client\n");
                server.getBroadcastOperations().sendEvent("setup", "ready");
            }
        });
        // Sets client target height 
        server.addEventListener("height", String.class, new DataListener<String>() {
            @Override
            public void onData(SocketIOClient client, String data,
                    AckRequest ackRequest) {
                System.out.println("Received new height from client: " + data);    
                targetHeight = Integer.valueOf(data);
            }
        });
        // Handle gameover
        server.addEventListener("gameover", String.class, new DataListener<String>() {
            @Override
            public void onData(SocketIOClient client, String data,
                    AckRequest ackRequest) {
                if (data.equals("restart")) {
                    // Client wants to restart level with same db and benchmark.
                    // Just reset height to default instead of restarting db.
                    System.out.println("Restarting game\n");
                } else if (data.equals("menu")) {
                    System.out.println("Returning to menu (stop db)\n");
                    // TODO: stop db
		    if (timer != null) {
                        timer.cancel();
                        timer.purge();
                        timer = null;
                    }
                } else {
                    System.out.println("Unrecognized gameover option: " + data + "\n");
                }
                targetHeight = defaultHeight;
                actualHeight = defaultHeight; 
            }
        });

        server.start();

        //Thread.sleep(Integer.MAX_VALUE);

        //server.stop();
    }

}
