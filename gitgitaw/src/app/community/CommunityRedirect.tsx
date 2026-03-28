import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCommunityModal } from '../../context/CommunityModalContext'

/** Opens the community modal then returns home (bookmark /shared /community links). */
export default function CommunityRedirect() {
  const navigate = useNavigate()
  const { openCommunity } = useCommunityModal()

  useEffect(() => {
    openCommunity()
    navigate('/', { replace: true })
  }, [navigate, openCommunity])

  return null
}
