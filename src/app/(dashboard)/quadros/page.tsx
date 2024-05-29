import { getFramesAction } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import { FrameAdd } from "./components/Frame/FrameAdd";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth()
  const quadros = session ? await getFramesAction(session.id) : []

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quadros</h1>
        <FrameAdd id={session?.id || ""} />
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