import { getListsAction } from "@/app/_actions";
import { ListAdd } from "../components/List/ListAdd";
import { ListDropdown } from "../components/List/ListDropdown";
import { CardAdd } from "../components/Card/CardAdd";
import { CardDropdown } from "../components/Card/CardDropdown";

export default async function Quadro({ params }: { params: { id: string } }) {
  const listas = await getListsAction(params.id)

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold"></h1>
        <ListAdd id={params.id} length={listas?.length || 0} />
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
                <div className={`flex flex-row justify-between border-2 border-black rounded-full py-2 px-4 items-center ${listStatus}`}>
                  <p>
                    {lista.title.length > 10 ? lista.title.slice(0, 10) + "..." : lista.title}
                  </p>
                  <ListDropdown list={lista} />
                </div>
                {
                  lista.cards.map((card) => <CardDropdown key={card.id} card={card} />)
                }
                <div className="flex justify-center items-center">
                  <CardAdd id={lista.id} />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}