import { authOptions } from "@/app/authOptions";
import { getServerSession } from "next-auth";
import { getFramesAction } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import { FrameAdd } from "./components/Frame/FrameAdd";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const quadros = await getFramesAction()

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quadros</h1>
        <FrameAdd id={session?.user.id || ""} />
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {quadros?.map(quadro => (
          <a key={quadro.id} href={`/quadros/${quadro.id}`}>
            <div className="flex flex-col p-4 bg-white rounded-lg text-center">
              <p className="font-bold">{quadro.title}</p>
              <p>{quadro.user.name}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}