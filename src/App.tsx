import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import AgroTables from './components/AgroTables';
import { yearlyData, cropStats } from './utils/dataProcessing';
export default function App() {
  return <MantineProvider theme={theme}>
      <div style={{margin:'30px'}} >
        <AgroTables yearlyData={yearlyData} cropStats={cropStats} />
      </div>
  </MantineProvider>;
}
