import { EditToolType } from '@/app/edit/page'
import Button from '@/components/button'
import toolsFeatures from '@/data/toolsFeatures'
import { Dispatch, FC, SetStateAction } from 'react'

//---------------------------------------------
interface IProps {
  toolType: EditToolType
  setToolType: Dispatch<SetStateAction<EditToolType>>
}
//---------------------------------------------
const SelectTools: FC<IProps> = ({ toolType, setToolType }) => {
  const setToolHandler = (tool: EditToolType) => {
    if (tool === toolType) return
    setToolType(tool)
  }

  return (
    <div>
      <h1 className='mb-2 text-slate-500'>Tools</h1>
      <ul className='flex items-center space-x-3 flex-wrap'>
        {toolsFeatures.map((tool) => {
          const Icon = tool.Icon

          return (
            <li key={tool.title}>
              <Button
                onClick={() => setToolHandler(tool.query)}
                className={`${
                  tool.query === toolType
                    ? 'text-white bg-primary'
                    : 'text-black bg-[#E5ECF9]'
                } 
        px-3 py-1 active:scale-95 duration-150 flex items-center space-x-2`}
              >
                {Icon} <span>{tool.title}</span>
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SelectTools
