import { getListsAction } from "@/app/_actions";
import { AddList } from "../components/AddList";
import { AddCard } from "../components/AddCard";

export default async function Quadro({ params }: { params: { id: string } }) {
  const listas = await getListsAction(params.id)

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold"></h1>
        <AddList id={params.id} length={listas?.length || 0} />
      </div>
      <div className="grid grid-cols-4 gap-4 items-start">
        {
          listas?.map((lista) => {
            const listStatus =
              lista.cards.every((card) => card.status === "Done") ? "bg-green-500"
                : lista.cards.every((card) => card.status === "Todo") ? "bg-red-500"
                  : lista.cards.some((card) => ["Todo", "InProgress"].includes(card.status)) ? "bg-yellow-500" : ""

            return (
              <div key={lista.id} className="flex flex-col space-y-2 border-2 border-black rounded-3xl p-4 bg-white">
                <div className={`flex flex-row justify-between border-2 border-black rounded-full p-2 ${listStatus}`}>
                  <p>{lista.title}</p>
                  <p>...</p>
                </div>
                {
                  lista.cards.map((card) => {
                    const cardStatus = card.status === "Done" ? "bg-green-200"
                      : card.status === "InProgress" ? "bg-yellow-200"
                        : "bg-red-200"

                    return (
                      <div key={card.id} className={`border-2 border-black rounded-full p-2 ${cardStatus}`}>
                        <p>{card.title}</p>
                      </div>
                    )
                  })
                }
                <div>
                  <AddCard id={lista.id} />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}