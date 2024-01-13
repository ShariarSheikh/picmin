import { toggleTutorialButton } from '@/redux/features/headerButtonsSlice'
import { useAppSelector } from '@/redux/hooks'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Player } from 'video-react'

const GlobalModalsProvider = () => {
  const isOpenTutorial = useAppSelector(
    (state) => state.headerButtonsSlice.isOpenTutorial,
  )

  return (
    <div>
      <TutorialModal isOpenModal={isOpenTutorial} />
    </div>
  )
}

export default GlobalModalsProvider

const TutorialModal = ({ isOpenModal }: { isOpenModal: boolean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const dispatch = useDispatch()

  useEffect(() => {
    if (isOpenModal) return onOpen()
    else {
      onClose()
      dispatch(toggleTutorialButton())
    }
  }, [isOpenModal])

  return (
    <Modal size='xl' isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Modal Title
            </ModalHeader>
            <ModalBody className='mb-4'>
              <Player autoPlay>
                <source src=' https://media.w3.org/2010/05/sintel/trailer_hd.mp4' />
              </Player>
            </ModalBody>
          </>
        }
      </ModalContent>
    </Modal>
  )
}
