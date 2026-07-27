import React, { useState, useEffect } from "react";

/* ---------- Brand tokens (from uploaded logo, exact extracted hex) ---------- */
const C = {
  blue: "#2C62E0",
  blueDark: "#1F49B8",
  navy: "#0E1A3D",
  navySoft: "#16234A",
  paper: "#F6F8FC",
  paperDim: "#EEF1F8",
  tint: "#EAF0FF",
  slate: "#4B5568",
  slateLight: "#8A93A6",
  white: "#FFFFFF",
};

const LOGO_SRC = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCADIAMgDASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAgCBAUGBwED/8QAGwEBAAICAwAAAAAAAAAAAAAAAAUGAQIDBAf/2gAMAwEAAhADEAAAAZUgAFrnF00W67fFuCmrp8wAAAAAAAAAGpxqyGuej1oJnpbfJiHHXqxKd2FGngB4esb8OXTMsMMyx+Q02DXIACzvKc4hayWN9dp4bYbdqPSujzyKLTy61Xek8o5xbYjouj2S0xQdniZLyTsP3atkPO7GHHsAABzCPk0tSs0XFh2W6sUdx+Ud5c1WV8jJVqVhjgsMcAv/ACTkR3KtoPOrGHHuAAAAALXOPIy1adfYALFGgL3yTUT3KtsPOrGHFuAAAAALfOPIz1aVfIALHGgLvyTEV26twPObIHFuAAAAAKD5Rrq0W+QAWSMAXPklYvt17oec2QOHcAAAAABj8hj99Ydj12ngPv5JOM7VW1exkp8zdd4illbPFy/YTN+fWENNgAAAAGPyGP31h2PXae+3kj43tVblea357YY+aleWfptYDn49glHDzbYCQlOtrnz+whjIAAADH5DH76w7+iRXplYr6Geb2UODk0mM8zucWWLjkqpvcEDG+yThf06sSshnntGnQAAAFjfM45v0g59A6/IAByXgs1OI26H4yLlCgdi7lCvu9OmeuioTIAAAAAAAAHIuKzHt7FGwzSgsZvoxt9kizi36VoW+VCZ9HQ7AAAAAAAAAAAAAAH//xAAmEAACAgIBBAEFAQEAAAAAAAADBAUGAQIgABAwQDQHERIVFhQT/9oACAEBAAEFAveYZEoMt1iRbK22Ka2xnG2PUsM+OCVfkWJM/aCsjMIVJwUgr6dgk8ysrw+n8nnRnjnP263k0xdfuY/r9zH9fuY/oEgq1vzc2zqnxqW2dbD3lrcjFZfvUi10w6w3nvHx5pNqDgwwavPOPyxIp7R73Cho5YmOm2xIgn7kxJZ4oIGkmoKCDBq+G41raT0zjOueySJpFiCh9IRB10MetYLAacZ4oomkWYGBDBq+OWrCMxkv053/ACV+nWmNo6KVihOOCQXsNgLOs8UkjSDMBABglvO22JFexWEs6xxTTK+xX6+KCW87TQkgWOxFnGOKihXmK9XhQS/nZZGmCx2Mk4fiqqV1iu10UGv52GBqBslkJOH4rLFcPXK4KDX85zjVDZbKSbNxXXI2et1scGDz774HpZrLvNm4gARo1arY4QHoSHwOIAbslrNaHCBeeDHLSdqbdk4CdFOKeaQ+BwCHdgtYrOkKJ10MetYJ806z1GSRoluIlgzKflkPgdxC3OSsVjSGE44JBew2As6z3hZk0I4g+GTV8kh8DsMexiVesaw4+p+F0nEW1CoscK7Pkg2lmRuA8ch8DoY9i71ar6xA+9mrmk2uYW65eFWsm0KcZNS6eKQ+BppsXerVbWJ042ysYlhba51zwqNo/W74z98eF7XO6VVq2IrTncKv/rxxp1o/5epcat+PKn2j/Rj07BR9Wdmkzol74znXNSs+JQfpnXEzoenRJ8/wsV1/CxXX8LFdCpUaEnu//8QAKREAAQMCBQQCAgMAAAAAAAAAAgEDBAAxEBESEyAhIjBhFFEjQzJAQf/aAAgBAwEBPwHC1bzdtXkkvq6WSWwhvqJbZW4ah+61j90i524LSpkuS4MJm6OVWp6dl0ao3TP+S4R46vL6oRQUyTjJibi6wvXxHvqo8ZGO4r1Kk7vaNsY8dXl9UIoCaR52qVK3e0bYx46vL6oRQE0j4JUrc7AtjHYV5fVCKAmkfBKlbnYFsWGFeL1QAgJpHwFbFhhXi9U66EUNI0zKIDzL/aRUJM05lbBhgniyS1aNpvJtKMiIlUr4RZO0ukrVfkVqYYJ4skoAFsdI4S42vvC+MSTo/GduS9abbFsdI8Jcb9gYxJP6z8bsID6j0r4DtfBdplHEHJz+h//EADYRAAEDAgMEBQoHAAAAAAAAAAECAwQABRARMRITIDIhIjBBsRRCUWFxkaHB4fAVIzNAUmKB/9oACAECAQE/AcACTkKMOSBtFs+7tLbATFbCiOufvLC8QErbMhA6w19fBunD5tblz+JopKeg8AORzpKgoBQwnLCIzhPoNAFRyFQ7JmNuT7qajMsfppAwuFwTCTkOlRpxxTqitZzJ4bddvJ07p7lo3aGBnt/A1cLiqcQ02Or41bLYIo3rvP4Y3C4JhI9KjpTjinVFazmTxgEnIVbLYIw3rvP4Yz56ISPSo6CnXVvLK1nMnjAzOQq2WwRxvXebwxnz0Qkf2Ogp11byy44cyewtds8n/Oe5vD64zpyISM/OOgp11b6y44ek9g3zjGdORCRmde4VFjPXR4uOHo7z8hUy1tvshDYyKdKWhTailQ6Rxt84wnTUQkZnXuFF3yl/bkK11plDbbYS1phc7cJSd43zj40QQcjxN84qbNRCb2la9wp99chZccPTharluDuHT1fD6Y3W274b9kdbv9fEDkc6ffXJcLjh6eC03LLKO8fYfljdrbrIZHtHz7OJeXWBsOjaHxoX2MdQfv8A2vxyL66mKjrc24+h/Yf/xABAEAACAQIBBwcICQMFAAAAAAABAgMEEQASICIxQVFhEyEwMkBxwRAzUmJzkqGxFCMkNEJTk9HhcoGRBUNjovD/2gAIAQEABj8C7dyk0ixJvc2xbl2k/pQ4yRVBG/5Bk4uDcHb2XK687+bj8cGWpkMjfAd3lABMlN+KI+G7EdRC2VG4uOyTTXul8lP6Rmy0LHQcZad//vln6dVAvfIMffqb9Vcffqb9Vcffqb9VcZMNTFM2uyOD0E5GsIbf4zqO3pH5HMKZX0iYfgj2d5wRDk0qeoLn/OLzTSSn12vmLBAuU7fDjjk49KQ9eTax6Ag6jienbXG1s0z20IFvfieb9/I007iONdZOGipr09N/2bvzkggXKdvhjITSlbryb+i+l0y3qUFmX0x++LHmI8qwQIXkbCwLpPrd95w8875Ea7cXOhAvUj3fznJBAmXI2MhdOZvOSb+kLyJyc35sfMcfVVqkesmL1FYWHoxrb44yKaIRjadp/vh553yI11nFzoU69SPxPHOSCBMuRsZK6c7eck3/AMdgeeZwkaaycbUpl6kfieOckECZcjahiw06huvJ4d3YHmmcJGguScbUpk6kfic5IIELyNqAxseobryeA4dgeaZwkaC5Y4sLpSodBPE5yQwoXkfmAGNj1L9eTwHYHllcJGguWOMlbpSIdBN/E5yQwoXkc2CjFzZ6pxpyeA7A8srBI1FyxxkJdKRDopv4nOSGFC8jmwUYyms9U4033cB2BnY2VRcnHJx3SkQ6K+lxOckUSF5GNgoxlvZ6txpPu4DsNT7NvlnLFEpeRjYKMcpJZ6txpN6PAYeed8iNcJVRuYViP1SDZ345RdGZeaSPcenqfZt8s1Y41LuxsFG3HKS2esYc7ejwGHnnfIjXbjKOhAvm4938+RKiA2YaxsYbsLPCeDJtU9NU+zb5ZixxqXdjYKNuOVls9Yw5z6HAYeed8iNdZxc6FOvUj8TxzBNHzqeZ49jDCVEDZSN8OHS1Ps2+XlVEUu7GwUbcctMA9Yw9zgPIYS2Q40kbccPBMuRIhsRm353p385H44SaFg8bi4I6Sp9m3y8ioilnY2AG3AnnAasYe5wzMpLLVoNBt/A4aORSjqbFTszeSlJajc6Q9HjhXRgyMLgjb0dT7NvlgIgLMeYAbcCoqAGrGH6ecamnFqtBq/MGCCLEbDmikqW+ysdFj/tn9ujqABcmNrD+2BU1IDVbah+X/PQNXUi/XDzkY/Hx785KCrbQ1RSHZw7I9fSJza5Yxs9YZy0NW31o5o5D+Lh39kaf/T7RyHnMJ6p7t2OTniaJ9zDMuOY4FLUt9rUcx/MH79kyJo1lT0XF8X+jZB9RiMdST38dST38dST38LJGJUdTcMJNXbv/xAAoEAEAAAMHAwUBAQAAAAAAAAABABFRICExQWGx8EBxwRAwgZGh8eH/2gAIAQEAAT8h65+PZUfsODIZy36QKVsm/Td+wbMCYGY9KfQTxMx1aEPluA4NBkeqyU3u7vUi9BceHXpG9IydMD7x+bM72onI4/ZaAFWQZsMSVoXzHKvMcq8xyrzDI1JnsqyH2MZO+6a0h45HwzrE6W5T5zfQb6Qyh+X6LwEahaffY/LfjmnIgqWLc/wFD2DFTCSQbbM38zJ+STZaN59ikPr8egXTnx4wieHuZHqyNC02d3wM1ciC0uWXL34NPaA3Ijjo6P36hyCiSOJ65VtDAKrkQ9gvN5ZEAEPNWehVi8W/Hu1NbRGybjIKtCLpIJqXuhQ9x4aZszvk/MEWiXE+mBWa+7F2ia/Nfv4mAoHmmxrF7BuPhaCJFyAy1aEXRA4N6oU6AEJp8WMZtXH4bLScHyDdoRdSLh46OhBZjSUTbkZ7Wm4PLiwiVbnw+G7oKEBiR932Pm2tOmaGvlJuRlv0GXWYoR80UPlbWq7BiR9SEHg36CeHUtwR8zWT3tMrWfgYqxyoxVN+gnYAoAibCjFXK7K1nllKsfChEdrfoeaqtSLKlvWPhIxHK/OALBvc1oVYm4FKuG5c4DyZSYvrGj7/ADVVmRvcs1QHKooPCbABDzVnoVYvSrxfs19GDRK9wtIkRM09k+9zVViW5Ms1QSOokHCbAUDzTY1i9g3HwsBxccn+qjEsi/lZrX3eaq9TzAFmqkH78JxDuVfRCy6PVMyH9zQb9rOL5B4GpFSixj3Oaq9A6IHmqkd3MgNGtXj6ymXqcu1tCjzGyVZ1ahE9PkgOCF5gc/b5qqHEuBzVQjCaIxBQ1q8bIAb0GRk60fjsjZ0kJI2Um1rgeX5jWABGY3ie0hYwGKzQekqgKG5428FmmHBRxPvjZm733r9+lKbdHM3tuf5eT7tYf9NcNeyvfHosYoBQyatmHaHA9RT7VsGUQZiYkCwL05Gfl99IrTMifphRe2f505R/Zx/Zx/ZwDiSoVWAkYz163//aAAwDAQACAAMAAAAQ889w88888888888t9L8881+8888u19/7lt9m88888p0Vm99//wDPPPPPORvfdvfPPPPPOX/fYnvPPPPPOpPfZlPPPPPPPPvfe2PPfPPPPPPvYK3vfdfPPPPPtXvD9PXPPPPPPnPPPOvfe/PPPPPPPPLKd/8A7zzzzzzzzzzzzzzz/8QAKBEBAAADBgYDAQEAAAAAAAAAAQARMRAgIVFh4UFxkcHR8DChsUCB/9oACAEDAQE/ELFBNgdkE+Z8i9MNDPWw4k1TR3uJYI6xousAJqdwTEhGqFikzH1jCgmuETCX+vY8wjN33Kyf3A1ex7hAc5BdmyyVTPeB2X7PMBrzzcA94wqpn72tmdwNXsawdCQX1BNpCKf57W5HFXsawdCQX1AmwjU89rcnir2NYPhIL9IRKa3Pa2XjAVfeMBwkHwVeVsvGAq+8YBHjwO77jDZ5lXkgw8xv1eVlBAq+8YJjHBgZuscwFYnGP1r5gQTL1XlFBAVct4NBILJNLBUz3/bZoTQ5bfl4SJAIJBcnzLmd/PW2m3J7eOnxsrzfW0IOCdXxGuddownqcTjz/g//xAApEQEAAQEFCAIDAQAAAAAAAAABETEAIUFRYRAgcYGRobHwwdEw4fFA/9oACAECAQE/ENgIJW1yx4vq1PxycglcpwZRjm8tkHK9hgxnUrOXLcASLo2/iNmoUddwgWFkZkSTg7KHcXNIOq2MHK0LKSxprzfg62Ojhhf1q9dmlRGWrp56pUrBXdhjUUSpomJ3NcKttLzxZcRK4xWEx2P1AAJXoNc3ka7IIZJ8unnqmP2DvgjlaFiQSqGT7zeRjOz3CMXTzQxTEDB30IJWxI5dD1XNwobZA3/0HTzQ0x0AfcN8FYLCAJdD1+m2cr/6Dod6FpwHp0/B3J521LPmauh+rK2v+h6HcoRv4eOdZvzmANcI7/cnnZVu+Z+jFtDqhEjA0Mj2bGoBLopGes1nHZGqOwydcnk6IghN7uTzatB8Rfoxfm0nBdtDINkRetHN9u3CbV2Tl0UGDM1O/Gu7FnC08RdAyNNzDNRvL46ZbY+LF4fPXP8AGNgNGYHPHnfrYqQvAs0+k+7MRSoJEOl7c5YcP8H/xAAoEAEAAgIBAgYCAwEBAAAAAAABESExQQAgUTBAYXGBkaGxEMHw0fH/2gAIAQEAAT8Q89TLtmPtKt9M8cGKFX7APxPHVrAX+s5GI4KA4RMnlZgspARmGyYnaoG0cijNhGjXoHzL/N4dbsVtX8NOx0EPQFNIaCImkfKNdXlU5I9sn6vpbguKo4T7X/rqDsaVIDiEKytPvoTZs1YsQ/CClMSl+vgNuj8Zgh+epPES47F+C9AxmyMOx9gWOKGoBo/U2/XgZPzNC9pMdC/0SrRfYjb7BKhwaRSNC/TL2PVVes8TjMIkJwKw0jfPtoHo9LpJtCpXupL+EvvhV6AZVgCVccd7Zb6xBk73uuDp9lO747G39qHBKEgw+js3HyZVfCqGSdKz1WQaVkHEXsHhCkRw/wAtSaA/VYwbXiRljEThKdgAHY7rzYqmi0GUaAzxOrQOhiukMusHr0x9CBW0+gteDhDQT8AdHy2+IJHrB7ejpsTFCceELQ07So/RwpAaFvENIg5GG29Spgmg53Pm77BlTQFq8slcxBiilHwFG16dZrDDaaC1ccExcVh9jDRvLePHkdtz6AypgAtUDkhtf4lVKPgMG16dd6dndMAWrQcrrJzHm2wOttug8dzDE6DQGVWAC1QOWdbK2uK6WfAYNr0wiV59q4AWrQE8jKD95u6wPyrdB473sIwD+1YALVAvl9ELsLxTSzBgMG16QmtDtdq4AJVaAV5L4JhMbusL8ol0HjoWw5Av2uALVAvk5nCjC4pyjBgMFqvSA5AMq79gCVWgFeUDZEUc32Fy5RLoPHQj6MC/0AWsBxKzBRgVf0sA91XpMBgyUfoMq0ArXKE8AJDm3AcuUS0AeOPJxhQUrXYHj2dRKLT37aPWeo8HjJV/W1aAVrh4DgZKr9Ebco7AEhF58seD7acK0f8AdcBBFCJVcvbvsOwHJMDEvSPY0BxNUZBjKMFqVQxjkBG2b7AxKPuNj5Q8Z6k4TAHISmisN/8A6e3NiqaLQZRoDPLQ4BoPrQy6wevJo+sJDR2o+EEhB5PaNCYN/uHZD5I8FbDBVgA5F38UK5bv9mCs9z7u+wZU0BavLIXMQYopR8BRtf5atGgEnD2Fuh7iiUqcho+DoNJ8kiPkDz37IKsADK8h/UOFS032GcFSvIJR0sAQiyCjsmS+M3x+HDtEIlIj0m6AByalo/MU6QhoH6T9IyI2IjZ4x52WFFWABary5g7C5a7ZQexUvQk+ViGSTucOzOFGGQwhWETpEAFDKeofqDITkJAsBQVIEyJ4h5LJ3FWAC1XXKvYKKlvhZQexUvUxQ+AAfVPcyqHhO0HATCI4R10o3gFTI/c2bPuAmMISJpHwijXTKgANq8kqFWEy0wooMYKl8BnT14EszQyaejjHTnxTNrQ7vhezEeUPOTOZMgNbJj0THTjtGGGFdDLSsPJkAiSOR5KdigZpcSe72PGyd1i7rA9SToAe5eELEdPLADrADD0GGym48nkyYs/AnEqcoL8CD4Of47+uf47+uf47+uDgojVkDpHjAKQRLL53/9k=";

/* Free-to-use stock photos (Unsplash License — free for commercial use, no attribution required) */
/* Free-to-use stock photos (Unsplash License — free for commercial use, no attribution required) */
const PHOTOS = {
  storefront:
    "https://images.unsplash.com/photo-1646504632442-6cacb1858bd6?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  interior1:
    "https://images.unsplash.com/photo-1689877020200-403d8542d95d?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  interior2:
    "https://images.unsplash.com/photo-1562771242-a02d9090c90c?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  products:
    "https://images.unsplash.com/photo-1729843352938-0e10fbf96585?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  extra:
    "https://plus.unsplash.com/premium_photo-1663127429325-3acefe582da5?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

/*
 * Generic placeholder photos for the gallery slider, one per product category.
 * NOTE: these are stand-ins (picsum.photos, seeded so they stay stable) — same
 * "placeholder, to replace with real store photography" status as the rest of
 * the site's images per the README. Swap `src` for real product photos whenever
 * you have them.
 */
const CATEGORY_PHOTOS = [
  { emoji: "🏏", label: "Cricket", desc: "Bats, balls, pads", src: "https://plus.unsplash.com/premium_photo-1679917506585-2c7b89054610?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { emoji: "🏃", label: "Training", desc: "Fitness gear", src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltZXF1aXBtZW50fGVufDB8fDB8fHww" },
  { emoji: "🏋️", label: "Fitness", desc: "Dumbbells & gym equipment", src: PHOTOS.interior2 },
  { emoji: "⚽", label: "Football", desc: "Footballs & boots", src: "https://plus.unsplash.com/premium_photo-1663133623858-f9573e2e587b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { emoji: "🏀", label: "Basketball", desc: "Basketballs", src: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { emoji: "🏸", label: "Badminton", desc: "Rackets", src: "https://plus.unsplash.com/premium_photo-1723867379328-6497df2470e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFkbWludG9uJTIwZXF1aXBtZW50fGVufDB8fDB8fHww" },
  { emoji: "🎾", label: "Tennis", desc: "Rackets", src: "https://plus.unsplash.com/premium_photo-1666913667082-c1fecc45275d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVubmlzJTIwZXF1aXBtZW50fGVufDB8fDB8fHww" },
  { emoji: "🏐", label: "Volleyball", desc: "Volleyballs", src: "https://plus.unsplash.com/premium_photo-1708558511853-8eb332fafb8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dm9sbGV5YmFsbCUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D" },
  { emoji: "👟", label: "Footwear", desc: "Sports shoes", src: PHOTOS.extra },
];

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "products", label: "Products" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "gallery", label: "Inside Kreedum Sports" },
  { id: "locations", label: "Locations" },
  { id: "contact", label: "Contact" },
];

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

      .font-display { font-family: 'Space Grotesk', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
      .font-mono { font-family: 'IBM Plex Mono', monospace; }

      .diag-bottom {
        clip-path: polygon(0 0, 100% 0, 100% 82%, 0 100%);
      }
      .diag-top {
        clip-path: polygon(0 18%, 100% 0, 100% 100%, 0 100%);
      }
      .diag-card {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
      .diag-photo {
        clip-path: polygon(6% 0, 100% 0, 94% 100%, 0% 100%);
      }
      .kr-focus:focus-visible {
        outline: 3px solid ${C.blue};
        outline-offset: 3px;
      }
        .kr-scroll-hide::-webkit-scrollbar {
        display: none;
      }
      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
      }
    `}</style>
  );
}

function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? C.white : "transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(14,26,61,0.08)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 kr-focus"
        >
          <img src={LOGO_SRC} alt="Kreedum logo" className="w-8 h-8 md:w-9 md:h-9" />
          <span
            className="font-display font-bold text-lg md:text-xl tracking-tight"
            style={{ color: scrolled ? C.navy : C.white }}
          >
            Kreedum<span style={{ color: C.blue }}>Sports</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-body text-sm font-medium kr-focus transition-colors"
              style={{ color: scrolled ? C.slate : "rgba(255,255,255,0.9)" }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="font-body text-sm font-semibold px-5 py-2.5 rounded-full kr-focus transition-transform hover:scale-105"
            style={{ backgroundColor: C.blue, color: C.white }}
          >
            Get in Touch
          </button>
        </nav>

        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 kr-focus"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 rounded transition-transform"
            style={{
              backgroundColor: scrolled ? C.navy : C.white,
              transform: open ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 rounded transition-transform"
            style={{
              backgroundColor: scrolled ? C.navy : C.white,
              transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ backgroundColor: C.white }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-body text-left text-base font-medium kr-focus"
              style={{ color: C.navy }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="font-body text-sm font-semibold px-5 py-3 rounded-full kr-focus text-center"
            style={{ backgroundColor: C.blue, color: C.white }}
          >
            Get in Touch
          </button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section
      id="home"
      className="relative overflow-hidden diag-bottom"
      style={{ backgroundColor: C.navy }}
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `linear-gradient(120deg, ${C.navy} 35%, ${C.blueDark} 100%)`,
        }}
      />
      <div
        className="absolute -right-24 -top-24 w-[520px] h-[520px] rounded-full opacity-20"
        style={{ background: C.blue, filter: "blur(10px)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-28 md:pt-44 md:pb-40 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="font-mono text-xs tracking-widest uppercase mb-5 inline-block px-3 py-1 rounded-full"
            style={{ color: C.white, backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            Lucknow · Since 2015
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] mb-6" style={{ color: C.white }}>
            Equipment for
            <br />
            <span style={{ color: "#8FADFF" }}>every kind of play.</span>
          </h1>
          <p className="font-body text-base md:text-lg mb-9 max-w-md" style={{ color: "rgba(255,255,255,0.75)" }}>
            Sports equipment, apparell, footwear, fitness machines, and full
            ground infrastructure — trusted by athletes, schools, and
            institutions across Lucknow.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="font-body font-semibold text-sm px-7 py-3.5 rounded-full kr-focus transition-transform hover:scale-105"
              style={{ backgroundColor: C.blue, color: C.white }}
            >
              Request a Quote
            </button>
            <button
              onClick={() => scrollTo("products")}
              className="font-body font-semibold text-sm px-7 py-3.5 rounded-full kr-focus border transition-transform hover:scale-105"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: C.white }}
            >
              View Products
            </button>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="diag-photo overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={PHOTOS.storefront}
              alt="Colourful sports equipment on display"
              className="w-full h-[420px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "11+", label: "Years in Lucknow" },
    { value: "2", label: "Store Locations" },
    { value: "4.7★", label: "Customer Rating" },
    { value: "B2B + Retail", label: "We Serve Both" },
  ];
  return (
    <section className="py-14" style={{ backgroundColor: C.paper }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <div className="font-display font-bold text-3xl md:text-4xl" style={{ color: C.navy }}>
              {s.value}
            </div>
            <div className="font-mono text-xs uppercase tracking-wide mt-1" style={{ color: C.slateLight }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 md:py-32" style={{ backgroundColor: C.white }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-14 items-center">
        <div className="md:col-span-3">
          <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: C.blue }}>
            About Kreedum
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-6" style={{ color: C.navy }}>
            A trusted name in Lucknow's sporting goods trade.
          </h2>
          <p className="font-body text-base leading-relaxed mb-5" style={{ color: C.slate }}>
            Kreedum International Private Limited is a leading provider of
            sports equipment, apparel, footwear, and accessories, along with
            fitness machines and accessories. We also specialise in sports
            infrastructure and ground equipment — the kind of work that turns
            an empty plot into a working field.
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: C.slate }}>
            With two stores in the Aminabad market, we serve walk-in
            customers and institutions alike: schools, academies, and sports
            authorities who need reliable equipment and a partner who
            understands the game.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">
            <div className="pl-4" style={{ borderLeft: `3px solid ${C.blue}` }}>
              <div className="font-display font-semibold text-sm" style={{ color: C.navy }}>Retail Customers</div>
              <div className="font-body text-sm mt-1" style={{ color: C.slateLight }}>
                Individual athletes, families, and local teams
              </div>
            </div>
            <div className="pl-4" style={{ borderLeft: `3px solid ${C.blue}` }}>
              <div className="font-display font-semibold text-sm" style={{ color: C.navy }}>Institutional Customers</div>
              <div className="font-body text-sm mt-1" style={{ color: C.slateLight }}>
                Schools, academies, and sports bodies
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 diag-photo overflow-hidden rounded-2xl">
          <img
            src={PHOTOS.interior1}
            alt="Modern gym filled with fitness machines"
            className="w-full h-[420px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Products() {
  const items = [
    {
      title: "Sports Equipment",
      desc: "Cricket, football, badminton, and gear across every major sport.",
    },
    {
      title: "Apparel & Footwear",
      desc: "Activewear and sports shoes for training, matches, and everyday wear.",
    },
    {
      title: "Fitness Machines & Accessories",
      desc: "Official Aerofit® dealer — treadmills, gym equipment, and home fitness gear.",
    },
    {
      title: "Sports Accessories",
      desc: "Nets, bags, protective gear, and the small essentials every player needs.",
    },
  ];
  return (
    <section id="products" className="py-24 md:py-32" style={{ backgroundColor: C.paper }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: C.blue }}>
            What We Stock
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: C.navy }}>
            Everything between the whistle and the finish line.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="p-8 rounded-2xl transition-transform hover:-translate-y-1"
              style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(14,26,61,0.06)" }}
            >
              <div className="font-mono text-xs mb-4" style={{ color: C.slateLight }}>
                0{i + 1}
              </div>
              <h3 className="font-display font-semibold text-lg mb-2" style={{ color: C.navy }}>
                {item.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: C.slate }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Infrastructure() {
  return (
    <section
      id="infrastructure"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: C.navy }}
    >
      <div
        className="absolute -left-32 bottom-0 w-[420px] h-[420px] rounded-full opacity-10"
        style={{ background: C.blue, filter: "blur(10px)" }}
      />
      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <div className="diag-photo overflow-hidden rounded-2xl order-2 md:order-1">
          <img
            src={PHOTOS.products}
            alt="Aerial view of a football field and stadium"
            className="w-full h-[380px] object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#8FADFF" }}>
            Institutional Work
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-6" style={{ color: C.white }}>
            Sports infrastructure & ground equipment.
          </h2>
          <p className="font-body text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
            Beyond retail, we work with schools, academies, and institutions
            to fit out playing fields and training grounds — from ground
            equipment to full sporting infrastructure, delivered with the
            same reliability our store customers know us for.
          </p>
          <ul className="space-y-3">
            {["Ground equipment supply & setup", "Institutional bulk orders", "Ongoing maintenance & support"].map(
              (t) => (
                <li key={t} className="flex items-center gap-3 font-body text-sm" style={{ color: C.white }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.blue }} />
                  {t}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const trackRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, CATEGORY_PHOTOS.length - 1));
    const card = track.children[clamped];
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  };

  const handlePrev = () => scrollToIndex(activeIndex - 1);
  const handleNext = () => scrollToIndex(activeIndex + 1);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  return (
    <section id="gallery" className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: C.white }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: C.blue }}>
              Gear & Ground
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: C.navy }}>
              Everything you need, in every sport.
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="w-11 h-11 rounded-full flex items-center justify-center kr-focus transition-opacity hover:opacity-70"
              style={{ backgroundColor: C.tint, color: C.blueDark }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next"
              className="w-11 h-11 rounded-full flex items-center justify-center kr-focus transition-opacity hover:opacity-70"
              style={{ backgroundColor: C.blue, color: C.white }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 kr-scroll-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORY_PHOTOS.map((p) => (
            <div
              key={p.label}
              className="diag-card overflow-hidden rounded-2xl flex-shrink-0 snap-start relative"
              style={{ width: "280px" }}
            >
              <img src={p.src} alt={`${p.label} — ${p.desc}`} className="w-full h-72 object-cover transition-transform hover:scale-105 duration-500" />
              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-4"
                style={{ background: "linear-gradient(to top, rgba(14,26,61,0.85), rgba(14,26,61,0))" }}
              >
                <div className="font-display font-semibold text-base flex items-center gap-2" style={{ color: C.white }}>
                  <span>{p.emoji}</span> {p.label}
                </div>
                <div className="font-body text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {CATEGORY_PHOTOS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${p.label}`}
              className="rounded-full transition-all"
              style={{
                width: i === activeIndex ? "22px" : "8px",
                height: "8px",
                backgroundColor: i === activeIndex ? C.blue : C.paperDim,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Locations() {
  const stores = [
    {
      name: "Sports Line – Kreedum",
      tag: "Official Aerofit® Fitness Store",
      address: "Krishna Plaza, Nazirabad Road, Aminabad, Lucknow, UP 226018",
      phone: "+91 80819 79754",
      hours: "10:30 AM – 9:00 PM (Tue till 5 PM, Thu till 7 PM)",
      rating: "4.7★ · 1,600+ reviews",
    },
    {
      name: "Kreedum – Second Store",
      tag: "General Sports Products",
      address: "Aminabad Market, Lucknow, UP — address to confirm",
      phone: "+91 80819 79754",
      hours: "10:30 AM – 9:00 PM (Tue till 5 PM, Thu till 7 PM)",
      rating: "4.7★ · 1,600+ reviews",
    },
  ];
  const firstStoreAddress = stores[0].address;
  const storesWithDirections = stores.map((s) => ({
    ...s,
    // Second store's address is still unconfirmed, so point both buttons
    // to the first (confirmed) store's location for now.
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(firstStoreAddress)}`,
  }));
  return (
    <section id="locations" className="py-24 md:py-32" style={{ backgroundColor: C.paper }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: C.blue }}>
            Visit Us
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: C.navy }}>
            Two stores, one street in Aminabad.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {storesWithDirections.map((s) => (
            <div key={s.name} className="p-8 rounded-2xl" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(14,26,61,0.06)" }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold text-lg" style={{ color: C.navy }}>
                    {s.name}
                  </h3>
                  <div className="font-mono text-xs uppercase tracking-wide mt-1" style={{ color: C.blue }}>
                    {s.tag}
                  </div>
                </div>
                {s.rating && (
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: C.tint, color: C.blueDark }}>
                    {s.rating}
                  </span>
                )}
              </div>
              <div className="space-y-2 font-body text-sm" style={{ color: C.slate }}>
                <p>{s.address}</p>
                <p>{s.phone}</p>
                <p>{s.hours}</p>
              </div>
              <a
                href={s.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: C.blue, color: C.white }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/>
                </svg>
                Get Directions
              </a>
            </div>
          ))}
        </div>
        <p className="font-body text-xs mt-6" style={{ color: C.slateLight }}>
        </p>
      </div>
    </section>
  );
}


function ContactForm() {
 const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  inquiryType: "",
  message: "",
});

  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const WHATSAPP_NUMBER = "7084144623"; // Include country code

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phone = value.replace(/\D/g, "").slice(0, 10);

      setForm((prev) => ({
        ...prev,
        phone,
      }));

      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone =
        "Please enter a valid 10-digit Indian mobile number.";
    }
    
    if (!form.inquiryType) {
  newErrors.inquiryType = "Please select an inquiry type.";
}

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

const text = `New Contact Request

Name: ${form.name}
Phone: ${form.phone}
${form.email ? `Email: ${form.email}\n` : ""}Inquiry Type: ${form.inquiryType}

Message:
${form.message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 diag-top overflow-hidden"
      style={{ backgroundColor: C.navy }}
    >
      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <div
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: "#8FADFF" }}
          >
            Get In Touch
          </div>

          <h2
            className="font-display font-bold text-3xl md:text-4xl mb-4"
            style={{ color: C.white }}
          >
            Tell us what you're looking for.
          </h2>

          <p
            className="font-body text-base"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Retail enquiry or institutional order — we'll get back to you.
          </p>
        </div>

        {sent ? (
          <div
            className="text-center p-10 rounded-2xl"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <p
              className="font-display font-semibold text-xl mb-2"
              style={{ color: C.white }}
            >
              Opening WhatsApp…
            </p>

            <p
              className="font-body text-sm"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              If it didn't open automatically, check your browser's pop-up
              blocker, or message us directly at +91 70841 44623.
            </p>

            <button
              onClick={() => setSent(false)}
              className="mt-6 font-body text-sm font-semibold px-6 py-2.5 rounded-full kr-focus"
              style={{ backgroundColor: C.blue, color: C.white }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-5 p-8 md:p-10 rounded-2xl"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label
                  className="font-mono text-xs uppercase tracking-wide block mb-2"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Name
                </label>

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    color: C.navy,
                  }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  className="font-mono text-xs uppercase tracking-wide block mb-2"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Phone
                </label>

                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[6-9]{1}[0-9]{9}"
                  title="Enter a valid 10-digit Indian mobile number"
                  className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    color: C.navy,
                  }}
                  placeholder="9876543210"
                />

                {errors.phone && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                className="font-mono text-xs uppercase tracking-wide block mb-2"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Email
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                style={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  color: C.navy,
                }}
                placeholder="you@example.com"
              />
            </div>
<div>
  <label
    className="font-mono text-xs uppercase tracking-wide block mb-2"
    style={{ color: "rgba(255,255,255,0.6)" }}
  >
    Inquiry Type
  </label>

  <select
    required
    name="inquiryType"
    value={form.inquiryType}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
    style={{
      backgroundColor: "rgba(255,255,255,0.95)",
      color: C.navy,
    }}
  >
    <option value="">Select Inquiry Type</option>
    <option value="General Inquiry">General Inquiry</option>
    <option value="Product Information">Product Information</option>
    <option value="Retail Order">Retail Order</option>
    <option value="Bulk Order">Bulk Order</option>
    <option value="Urgent">Urgent</option>
  </select>
</div>
            <div>
              <label
                className="font-mono text-xs uppercase tracking-wide block mb-2"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Message
              </label>

              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus resize-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  color: C.navy,
                }}
                placeholder="What are you looking for?"
              />
            </div>

            <button
              type="submit"
              className="font-body font-semibold text-sm px-7 py-3.5 rounded-full kr-focus transition-transform hover:scale-105 justify-self-start inline-flex items-center gap-2"
              style={{
                backgroundColor: "#25D366",
                color: "#08331C",
              }}
            >
              {/* Your WhatsApp SVG */}
              Message us on WhatsApp
            </button>
          </form>
        )}

        <p
          className="font-mono text-xs text-center mt-6"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Submitting opens a pre-filled WhatsApp chat — no email account
          needed.
        </p>
      </div>
    </section>
  );
}

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com/kreedumsports",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/kreedum_official/?hl=en",
    path: "M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47a4.9 4.9 0 0 0-1.77 1.15A4.9 4.9 0 0 0 2.53 5.45c-.25.64-.42 1.37-.47 2.43C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.15 1.77.55.55 1.11.9 1.77 1.15.64.25 1.37.42 2.43.47C8.94 21.99 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47a4.9 4.9 0 0 0 1.77-1.15 4.9 4.9 0 0 0 1.15-1.77c.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.15-1.77A4.9 4.9 0 0 0 18.55.53c-.64-.25-1.37-.42-2.43-.47C15.06.01 14.72 0 12 0zm0 1.98c2.67 0 2.99.01 4.04.06.98.04 1.5.2 1.85.34.47.18.8.4 1.15.75.35.35.57.68.75 1.15.14.36.3.87.34 1.85.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.2 1.5-.34 1.85-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.36.14-.87.3-1.85.34-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.2-1.85-.34a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.14-.36-.3-.87-.34-1.85C1.99 14.99 1.98 14.67 1.98 12s.01-2.99.06-4.04c.04-.98.2-1.5.34-1.85.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.36-.14.87-.3 1.85-.34C9.01 3.99 9.33 3.98 12 3.98zm0 3.37a4.65 4.65 0 1 0 0 9.3 4.65 4.65 0 0 0 0-9.3zm0 7.67a3.02 3.02 0 1 1 0-6.04 3.02 3.02 0 0 1 0 6.04zm5.92-7.86a1.09 1.09 0 1 1-2.17 0 1.09 1.09 0 0 1 2.17 0z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/kreedum-international-pvt-ltd/",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z",
  },
  {
    name: "Twitter",
    href: "https://x.com/kreedumsports",
    path: "M18.9 2h3.3l-7.2 8.2L23.5 22h-6.6l-5.2-6.8L5.7 22H2.4l7.7-8.8L1.5 2h6.8l4.7 6.2L18.9 2zm-1.16 18h1.83L7.34 3.9H5.38L17.74 20z",
  },
];

function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)" xmlns="http://www.w3.org/2000/svg">
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: C.navy }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <img src={LOGO_SRC} alt="Kreedum logo" className="w-7 h-7" />
          <span className="font-display font-semibold text-sm" style={{ color: C.white }}>
            Kreedum<span style={{ color: "#8FADFF" }}>Sports</span>
          </span>
        </div>
        <div className="flex justify-center">
          <SocialLinks />
        </div>
        <p className="font-body text-xs text-center md:text-right" style={{ color: "rgba(255,255,255,0.45)" }}>
          © {new Date().getFullYear()} Kreedum International Private Limited. Aminabad, Lucknow.
        </p>
      </div>
    </footer>
  );
}



export default function KreedumSportsLanding() {
  return (
    <div className="font-body" style={{ backgroundColor: C.white }}>
      <GlobalStyle />
      <Nav />
      <Hero />
      <StatsBar />
      <About />
      <Products />
      <Infrastructure />
      <Gallery />
      <Locations />
      <ContactForm/>
      <Footer />
    </div>
  );
}
