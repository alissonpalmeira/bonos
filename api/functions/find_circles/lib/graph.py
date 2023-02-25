import networkx as nx

def find_circles(edges):
    circles = []
    graph = nx.DiGraph()
    
    graph.add_edges_from(edges)
    circles = [*circles, *_find_cycles(graph)]

    return circles

def _find_cycles(graph):
    cycles = []
    cycle = _find_cycle(graph)
     
    if cycle:
        amount = cycle['amount']
        if amount > 0:
            cycles.append(cycle)

        nodes_to_remove = []
        edges_to_remove = []
        for demander, issuer in cycle['edges']:
            graph[demander][issuer]['amount'] -= amount
            graph[demander][issuer]['issuable'] -= amount
            if graph[demander][issuer]['amount'] < 1:
                edges_to_remove.append((demander, issuer))
            if graph[demander][issuer]['issuable'] < 1:
                nodes_to_remove.append(issuer)
        graph.remove_nodes_from(set(nodes_to_remove))
        graph.remove_edges_from(edges_to_remove)
        cycles = [*cycles, *_find_cycles(graph)]

    return cycles  

def _find_cycle(graph):
    try:
        cycle_edges = nx.find_cycle(graph)
        values = []

        for edge in cycle_edges:
            weight = graph[edge[0]][edge[1]]
            issuable = weight['issuable']
            amount = weight['amount']
            value = amount if issuable > amount else issuable
            values.append(value)
        amount = min(values)

        return {
            'edges': cycle_edges,
            'amount': amount
        }
    except Exception as e:
        return None