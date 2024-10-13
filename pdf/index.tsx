import { renderToFile } from "@react-pdf/renderer";

import Resume from "./Resume";

await renderToFile(<Resume />, "./docs/resume.pdf");
