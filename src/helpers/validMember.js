const validMember = ({
  approved,
  membershipDue,
  membershipFee,
  membershipStatus,
  regState,
  verified,
}) => {
  if (regState < 8) return '/signup'
  if (!verified) return '/signup'
  if (!approved) return '/signup'
  if (membershipDue !== 'paid') return '/signup'
  if (membershipFee !== 'paid') return '/signup'
  return true
}

export default validMember
