import { Menu } from '@headlessui/react'


export default function Dropdown() {
  return (
    <Menu>
      <Menu.Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Medical Centers</Menu.Button>
      <Menu.Items className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active && 'bg-blue-100'} w-full rounded-md p-2`}
              href="/account-settings"
            >
              Doctors
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active && 'bg-blue-100'} w-full rounded-md p-2`}
              href="/account-settings"
            >
              Pharmacies
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active && 'bg-blue-100'} w-full rounded-md p-2`}
              href="/account-settings"
            >
              Labs
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${active && 'bg-blue-100'} w-full rounded-md p-2`}
              href="/account-settings"
            >
              X-Ray Centers
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
