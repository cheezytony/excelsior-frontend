import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getTags } from '../../../api/tags';
import { TagModel } from '../../../types/models';
import {
  IconBookmark,
  IconDiscovery,
  IconFilter,
  IconGrid,
} from '../../common/icons';
import { Logo } from '../../common/logo';
import { Nav, NavItem } from '../../common/nav';
import { Tag } from '../../common/tag';

export default function AppLayoutSidebar() {
  return (
    <aside className="flex-shrink-0 relative w-[300px]">
      <div className="flex flex-col gap-16 sticky top-0">
        <div className="border-b flex h-[100px] items-center px-8 dark:border-gray-700">
          <Logo />
        </div>
        <div className="flex flex-col gap-8 text-[1.25rem] px-8">
          <Nav orientation="vertical">
            <NavItem href="/" icon={<IconGrid />}>
              Feed
            </NavItem>
            <NavItem href="/discover" icon={<IconDiscovery />}>
              Discover
            </NavItem>
            <NavItem exactMatch={false} href="/topics" icon={<IconFilter />}>
              Topics
            </NavItem>
            <NavItem
              exactMatch={false}
              href="/tags"
              icon={<IconBookmark />}
              after={<Tags />}
            >
              Tags
            </NavItem>
          </Nav>
        </div>
      </div>
    </aside>
  );
}

const Tags = () => {
  const [tags, setTags] = useState<Array<TagModel>>([]);

  useEffect(() => {
    getTags({ limit: 8 })
      .then(({ data: { data } }) => {
        setTags(data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  return (
    <div className="duration-300 mt-4 max-h-0 overflow-hidden sticky top-0 left-0 group-hover:max-h-screen">
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Link key={index} href={`/tags/${tag.slug}`}>
            <a>
              <Tag
                className="duration-200 opacity-0 transform scale-50 group-hover:opacity-100 group-hover:scale-100"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {tag.title}
              </Tag>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
};
