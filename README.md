# ab-cache-breaker
Apache ab command like script made in node that permits to send GET request adding a random parameter  hence causing to break intermediary and end caches.

Tool  for benchmarking your WebApp that use Protocol (HTTP) server. It is designed for use for stressing tests on your own servers. 

<pre><code>$ ws --help
<strong>Synopsis</strong>

  $ ab-cache-breaker -n [requests] -c [concurrency] [url]
  $ ab-cache-breaker --help

<strong>ab-cache-breaker</strong>

  -n, requests          Number of requests to perform.
  -c, concurrency       Number of multiple requests
  -d                    device [mobile/desktop] 
  [url], [http[s]://]hostname[:port]/path  
        
</code></pre>