import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'avatar', title: 'Avatar', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'blockContent' }),
    defineField({ name: 'twitter', title: 'Twitter', type: 'url' }),
    defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
    defineField({ name: 'youtube', title: 'YouTube', type: 'url' })
  ]
})

