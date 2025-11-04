import { Stack } from "expo-router";
import { ThemeProvider } from "../contexts/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "../lib/convex";

const convex = new ConvexReactClient(CONVEX_URL, { unsavedChangesWarning: false });

// import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConvexProvider client={convex}>
        <ThemeProvider>
          <Stack />
        </ThemeProvider>
      </ConvexProvider>
    </GestureHandlerRootView>
  );
}
