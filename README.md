# ab-cache-breaker
Apache ab command like script made in node that permits to send GET request adding a random parameter  hence causing to break intermediary and end caches.

Tool  for benchmarking your WebApp that use Protocol (HTTP) server. It is designed for use for stressing tests on your own servers. 

<strong>Install</strong>
<pre><code>
$npm install -g ab-cache-breaker
<br>

<strong>Synopsis</strong>
<br>
  $ ws --help
  $ ab-cache-breaker -n [requests] -c [concurrency] [url]
  $ ab-cache-breaker --help
<br>
<strong>ab-cache-breaker</strong>
<br>
  -n, requests          Number of requests to perform.
  -c, concurrency       Number of multiple requests.
  [url]                 [http[s]://]hostname[:port]/path
  
  <strong>optional:</strong>
<br>
  -d                    device [mobile/desktop] 
  
        
</code></pre>