import Link from 'next/link'
import React, { FC } from 'react'

interface IProps {
  color: 'white' | '#0042C7'
}

const Logo: FC<IProps> = (props) => {
  return (
    <Link href='/'>
      <svg
        width='154'
        height='62'
        viewBox='0 0 251 62'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M83.8203 37.6883V42.2586H69.5039V37.6883H83.8203ZM71.3984 13.8211V42.2586H65.5391V13.8211H71.3984ZM98.2344 37.493V28.0789C98.2344 27.4019 98.1237 26.8224 97.9023 26.3407C97.681 25.8459 97.3359 25.4617 96.8672 25.1883C96.4115 24.9149 95.819 24.7782 95.0898 24.7782C94.4648 24.7782 93.9245 24.8888 93.4688 25.1102C93.013 25.3185 92.6615 25.6245 92.4141 26.0282C92.1667 26.4188 92.043 26.881 92.043 27.4149H86.418C86.418 26.5164 86.6263 25.6636 87.043 24.8563C87.4596 24.049 88.0651 23.3394 88.8594 22.7274C89.6536 22.1024 90.5977 21.6141 91.6914 21.2625C92.7982 20.911 94.0352 20.7352 95.4023 20.7352C97.043 20.7352 98.5013 21.0086 99.7773 21.5555C101.053 22.1024 102.056 22.9227 102.785 24.0164C103.527 25.1102 103.898 26.4774 103.898 28.118V37.161C103.898 38.3198 103.97 39.2703 104.113 40.0125C104.257 40.7417 104.465 41.3797 104.738 41.9266V42.2586H99.0547C98.7812 41.6857 98.5729 40.9696 98.4297 40.1102C98.2995 39.2378 98.2344 38.3654 98.2344 37.493ZM98.9766 29.3875L99.0156 32.5711H95.8711C95.1289 32.5711 94.4844 32.6558 93.9375 32.825C93.3906 32.9943 92.9414 33.2352 92.5898 33.5477C92.2383 33.8472 91.9779 34.1987 91.8086 34.6024C91.6523 35.006 91.5742 35.4487 91.5742 35.9305C91.5742 36.4123 91.6849 36.8485 91.9062 37.2391C92.1276 37.6167 92.4466 37.9162 92.8633 38.1375C93.2799 38.3459 93.7682 38.45 94.3281 38.45C95.1745 38.45 95.9102 38.2808 96.5352 37.9422C97.1602 37.6037 97.6419 37.187 97.9805 36.6922C98.332 36.1974 98.5143 35.7287 98.5273 35.286L100.012 37.6688C99.8034 38.2026 99.5169 38.756 99.1523 39.3289C98.8008 39.9019 98.3516 40.4422 97.8047 40.95C97.2578 41.4448 96.6003 41.855 95.832 42.1805C95.0638 42.493 94.1523 42.6492 93.0977 42.6492C91.7565 42.6492 90.5391 42.3823 89.4453 41.8485C88.3646 41.3016 87.5052 40.5529 86.8672 39.6024C86.2422 38.6388 85.9297 37.5451 85.9297 36.3211C85.9297 35.2144 86.138 34.2313 86.5547 33.3719C86.9714 32.5125 87.5833 31.7899 88.3906 31.2039C89.2109 30.605 90.2331 30.1558 91.457 29.8563C92.681 29.5438 94.1003 29.3875 95.7148 29.3875H98.9766ZM125.051 37.8641V42.2586H108.996V37.8641H125.051ZM124.738 24.368L111.262 42.2586H107.492V38.9188L120.91 21.1258H124.738V24.368ZM122.746 21.1258V25.5399H107.805V21.1258H122.746ZM134.855 39.8758L140.461 21.1258H146.496L138 45.4422C137.818 45.9761 137.57 46.549 137.258 47.161C136.958 47.7729 136.548 48.3524 136.027 48.8992C135.52 49.4591 134.875 49.9149 134.094 50.2664C133.326 50.618 132.382 50.7938 131.262 50.7938C130.728 50.7938 130.292 50.7612 129.953 50.6961C129.615 50.631 129.211 50.5399 128.742 50.4227V46.3016C128.885 46.3016 129.035 46.3016 129.191 46.3016C129.348 46.3146 129.497 46.3211 129.641 46.3211C130.383 46.3211 130.988 46.2365 131.457 46.0672C131.926 45.8979 132.303 45.6375 132.59 45.286C132.876 44.9474 133.104 44.5047 133.273 43.9578L134.855 39.8758ZM132.512 21.1258L137.102 36.4383L137.902 42.3953L134.074 42.8055L126.477 21.1258H132.512ZM172.453 27.3758V28.7235C172.453 30.8849 172.16 32.825 171.574 34.5438C170.988 36.2625 170.161 37.7274 169.094 38.9383C168.026 40.1362 166.75 41.0542 165.266 41.6922C163.794 42.3302 162.16 42.6492 160.363 42.6492C158.579 42.6492 156.945 42.3302 155.461 41.6922C153.99 41.0542 152.714 40.1362 151.633 38.9383C150.552 37.7274 149.712 36.2625 149.113 34.5438C148.527 32.825 148.234 30.8849 148.234 28.7235V27.3758C148.234 25.2013 148.527 23.2612 149.113 21.5555C149.699 19.8367 150.526 18.3719 151.594 17.161C152.674 15.95 153.951 15.0255 155.422 14.3875C156.906 13.7495 158.54 13.4305 160.324 13.4305C162.121 13.4305 163.755 13.7495 165.227 14.3875C166.711 15.0255 167.987 15.95 169.055 17.161C170.135 18.3719 170.969 19.8367 171.555 21.5555C172.154 23.2612 172.453 25.2013 172.453 27.3758ZM166.535 28.7235V27.3367C166.535 25.8263 166.398 24.4982 166.125 23.3524C165.852 22.2065 165.448 21.243 164.914 20.4617C164.38 19.6805 163.729 19.0946 162.961 18.7039C162.193 18.3003 161.314 18.0985 160.324 18.0985C159.335 18.0985 158.456 18.3003 157.688 18.7039C156.932 19.0946 156.288 19.6805 155.754 20.4617C155.233 21.243 154.836 22.2065 154.562 23.3524C154.289 24.4982 154.152 25.8263 154.152 27.3367V28.7235C154.152 30.2209 154.289 31.549 154.562 32.7078C154.836 33.8537 155.24 34.8237 155.773 35.618C156.307 36.3992 156.958 36.9917 157.727 37.3953C158.495 37.799 159.374 38.0008 160.363 38.0008C161.353 38.0008 162.232 37.799 163 37.3953C163.768 36.9917 164.413 36.3992 164.934 35.618C165.454 34.8237 165.852 33.8537 166.125 32.7078C166.398 31.549 166.535 30.2209 166.535 28.7235ZM182.355 36.7899L186.75 21.1258H190.324L189.172 27.2782L184.777 42.2586H181.789L182.355 36.7899ZM180.129 21.1258L183.273 36.7703L183.566 42.2586H180.051L174.699 21.1258H180.129ZM194.348 36.5164L197.414 21.1258H202.863L197.512 42.2586H194.016L194.348 36.5164ZM190.812 21.1258L195.188 36.6727L195.793 42.2586H192.785L188.391 27.2977L187.277 21.1258H190.812ZM211.633 12.2586V42.2586H205.988V12.2586H211.633ZM226.008 42.6492C224.367 42.6492 222.896 42.3888 221.594 41.868C220.292 41.3341 219.185 40.5985 218.273 39.661C217.375 38.7235 216.685 37.6362 216.203 36.3992C215.721 35.1492 215.48 33.8211 215.48 32.4149V31.6336C215.48 30.0321 215.708 28.5672 216.164 27.2391C216.62 25.911 217.271 24.7586 218.117 23.7821C218.977 22.8055 220.018 22.0568 221.242 21.536C222.466 21.0021 223.846 20.7352 225.383 20.7352C226.88 20.7352 228.208 20.9826 229.367 21.4774C230.526 21.9722 231.496 22.6753 232.277 23.5867C233.072 24.4982 233.671 25.592 234.074 26.868C234.478 28.131 234.68 29.5373 234.68 31.0867V33.4305H217.883V29.6805H229.152V29.2508C229.152 28.4696 229.009 27.7729 228.723 27.161C228.449 26.536 228.033 26.0412 227.473 25.6766C226.913 25.312 226.197 25.1297 225.324 25.1297C224.582 25.1297 223.944 25.2925 223.41 25.618C222.876 25.9435 222.44 26.3992 222.102 26.9852C221.776 27.5711 221.529 28.2612 221.359 29.0555C221.203 29.8367 221.125 30.6961 221.125 31.6336V32.4149C221.125 33.2612 221.242 34.0425 221.477 34.7586C221.724 35.4748 222.069 36.0933 222.512 36.6141C222.967 37.1349 223.514 37.5386 224.152 37.825C224.803 38.1115 225.539 38.2547 226.359 38.2547C227.375 38.2547 228.319 38.0594 229.191 37.6688C230.077 37.2651 230.839 36.6597 231.477 35.8524L234.211 38.8211C233.768 39.4591 233.163 40.0711 232.395 40.6571C231.639 41.243 230.728 41.7248 229.66 42.1024C228.592 42.467 227.375 42.6492 226.008 42.6492Z'
          fill={props.color}
        />
        <path d='M31.5 0L58.7798 46.5H4.2202L31.5 0Z' fill={props.color} />
      </svg>
    </Link>
  )
}

export default Logo
