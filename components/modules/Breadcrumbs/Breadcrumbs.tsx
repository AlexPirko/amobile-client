/* eslint-disable max-len */
import { useStore } from 'effector-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useMemo } from 'react'
import { $mode } from '@/context/mode'
import Crumb from './Crumb'
import styles from '@/styles/breadcrumbs/index.module.scss'

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split('?')[0]
  return pathWithoutQuery.split('/').filter((v) => v.length > 0)
}

const Breadcrumbs = ({
  getTextGenerator,
  getDefaultTextGenerator,
}: {
  getTextGenerator: (arg0: string, query: ParsedUrlQuery) => void
  getDefaultTextGenerator: (arg0: string, href: string) => string
}) => {
  const router = useRouter()
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathNestedRoutes = generatePathParts(router.asPath)
      const pathnameNestedRoutes = generatePathParts(router.pathname)

      const crumbList = asPathNestedRoutes.map((subpath, idx) => {
        const param = pathnameNestedRoutes[idx]
          .replace('[', '')
          .replace(']', '')

        const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')
        return {
          href,
          textGenerator: getTextGenerator(param, router.query),
          text: getDefaultTextGenerator(subpath, href),
        }
      })

      return [...crumbList]
    },
    [
      router.asPath,
      router.pathname,
      router.query,
      getTextGenerator,
      getDefaultTextGenerator,
    ]
  )

  return (
    <div className="container">
      <ul className={styles.breadcrumbs}>
        <li className={styles.breadcrumbs__item}>
          <Link href="/" passHref legacyBehavior>
            <a>
              <span
                className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`}
                style={{ marginRight: 0 }}
              >
                Главная
              </span>
            </a>
          </Link>
        </li>
        {breadcrumbs.map((crumb, idx) =>
          crumb.text ? (
            <li
              key={idx}
              className={`${styles.breadcrumbs__item} ${darkModeClass}`}
            >
              {/**eslint-disable-next-line @typescript-eslint/ban-ts-comment
               * @ts-ignore */}
              <Crumb
                {...crumb}
                key={idx}
                last={idx === breadcrumbs.length - 1}
              />
            </li>
          ) : (
            ''
          )
        )}
      </ul>
    </div>
  )
}

export default Breadcrumbs
