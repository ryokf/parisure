//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ParisurePool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const parisurePoolAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'waitingPeriod', internalType: 'uint256', type: 'uint256' },
      { name: 'maxCoverageAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_duration', internalType: 'uint256', type: 'uint256' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
      { name: '_isActive', internalType: 'bool', type: 'bool' },
    ],
    name: 'createPolicy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getClaimsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'uint256', type: 'uint256' }],
    name: 'getMember',
    outputs: [
      {
        name: '',
        internalType: 'struct PoolLib.Member',
        type: 'tuple',
        components: [
          { name: 'isActive', internalType: 'bool', type: 'bool' },
          { name: 'joinedAt', internalType: 'uint256', type: 'uint256' },
          { name: 'expiredDate', internalType: 'uint256', type: 'uint256' },
          { name: 'policyId', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMemberCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPolicyCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_policyId', internalType: 'uint256', type: 'uint256' }],
    name: 'getPolicyDetail',
    outputs: [
      {
        name: '',
        internalType: 'struct PoolLib.Policy',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'isActive', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPoolDetail',
    outputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'i_owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_policyId', internalType: 'uint256', type: 'uint256' }],
    name: 'memberJoinPool',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 's_claims',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'claimant', internalType: 'address', type: 'address' },
      { name: 'photoUrl', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'voteYes', internalType: 'uint256', type: 'uint256' },
      { name: 'voteNo', internalType: 'uint256', type: 'uint256' },
      {
        name: 'status',
        internalType: 'enum PoolLib.statusClaims',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 's_maxCoverageAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 's_members',
    outputs: [
      { name: 'isActive', internalType: 'bool', type: 'bool' },
      { name: 'joinedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'expiredDate', internalType: 'uint256', type: 'uint256' },
      { name: 'policyId', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 's_name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 's_policyList',
    outputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'duration', internalType: 'uint256', type: 'uint256' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'isActive', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'claimId', internalType: 'uint256', type: 'uint256' },
      { name: 'member', internalType: 'address', type: 'address' },
    ],
    name: 's_voters',
    outputs: [{ name: 'hasVoted', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 's_waitingPeriod',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_evidenceUrl', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
    ],
    name: 'submitClaim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_claimId', internalType: 'uint256', type: 'uint256' },
      { name: 'vote', internalType: 'bool', type: 'bool' },
    ],
    name: 'voteClaim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'claimId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'status',
        internalType: 'enum PoolLib.statusClaims',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ClaimExecuted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'claimant',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'claimId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'photoUrl',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'ClaimSubmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'emberAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'policyId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MemberJoined',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'claimId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'vote', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'Voted',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolFactoryAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_waitingPeriod', internalType: 'uint256', type: 'uint256' },
      { name: '_maxCoverageAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createPool',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_poolId', internalType: 'uint256', type: 'uint256' }],
    name: 'getPoolDetail',
    outputs: [
      {
        name: '',
        internalType: 'struct PoolFactory.PoolInfo',
        type: 'tuple',
        components: [
          { name: 'poolAddress', internalType: 'address', type: 'address' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'name', internalType: 'string', type: 'string' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPoolLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'poolList',
    outputs: [
      { name: 'poolAddress', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'poolAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'PoolCreated',
  },
] as const
