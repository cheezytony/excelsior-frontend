import Link from 'next/link';
import { useMemo } from 'react';
import { UserModel } from '../../../types/models';
import { Avatar } from '../../common/avatar';
import { IconGithub, IconGlobe, IconInstagram } from '../../common/icons';
import { Tag } from '../../common/tag';

interface ProfileBasicInformationAttributes {
  user: UserModel;
}

export default function ProfileBasicInformation({
  user,
}: ProfileBasicInformationAttributes) {
  const getSocialIcon = (name: string) => {
    switch (name) {
      case 'github':
        return <IconGithub />;
      case 'instagram':
        return <IconInstagram />;
      case 'website':
        return <IconGlobe />;
    }
  };
  const socials = useMemo(
    () =>
      [
        {
          name: 'github',
          title: '@cheezytony',
          link: 'https://github.com/cheezytony',
        },
        {
          name: 'instagram',
          title: '@antonio_okoro',
          link: 'https://instagram.com/antonio_okoro',
        },
        {
          name: 'website',
          title: 'antonio-okoro.vercel.app',
          link: 'https://antonio-okoro.vercel.app',
        },
      ].map((social) => ({ ...social, icon: getSocialIcon(social.name) })),
    []
  );
  
  return (
    <section className="flex flex-shrink-0 flex-wrap gap-4">
      <Avatar src={user.profile.avatar} size="xl" />
      <div className="flex flex-col gap-4 max-w-full w-[600px]">
        <div>
          <div className="flex gap-2 items-center">
            <div className="font-bold text-2xl">{user.full_name}</div>
            <div className='text-blue-700 text-opacity-50'>@{user.username}</div>
          </div>
          <div>Software Engineer</div>
        </div>
        <div className="text-gray-500">{user.profile?.bio}</div>
        {/* TODO: Social */}
        <div className="flex flex-wrap gap-2">
          {socials.map((social, index) => (
            <Link key={index} href={social.link}>
              <a target="_blank">
                <Tag size="md">
                  {social.icon}
                  <span>{social.title}</span>
                </Tag>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
