# ab-cache-breaker
Apache ab command like script made in node that permits to send GET request adding a random parameter  hence causing to break intermediary and end caches.

Tool  for benchmarking your WebApp that use Protocol (HTTP) server. It is designed for use on stress tests on your own servers. 

<strong>Synopsis</strong>

  $ ab-cache-breaker -n <requests> -c <concurrency> <url>
  $ ws --help

<strong>Server</strong>

  -n, requests                  Number of requests to perform.
  -c, concurrency               Number of multiple requests to make at a time current directory.
  url, [http[s]://]hostname[:port]/path        