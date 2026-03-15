import { getCoreTree } from "@/lib/github";
import { CoreEditor } from "./CoreEditor";

export const revalidate = 60;

export default async function CorePage() {
  const tree = await getCoreTree();
  return <CoreEditor tree={tree} />;
}
